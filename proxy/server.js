const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const { URL } = require('url');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all origins
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: '*',
  exposedHeaders: '*'
}));

// Parse different body types - IMPORTANT: Order matters!
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.text({ limit: '50mb', type: 'text/*' }));
app.use(express.raw({ limit: '50mb', type: 'application/*' }));

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(`\n${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  if (req.body) {
    if (typeof req.body === 'object') {
      console.log('Body:', JSON.stringify(req.body, null, 2));
    } else {
      console.log('Body (raw):', req.body);
    }
  }
  next();
});

// Helper function to parse cookies from Set-Cookie headers
function parseCookies(setCookieHeaders) {
  const cookies = {};
  if (!setCookieHeaders) return cookies;
  
  const cookieArray = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];
  
  cookieArray.forEach(cookieString => {
    const parts = cookieString.split(';');
    const [name, value] = parts[0].split('=');
    if (name && value) {
      cookies[name.trim()] = value.trim();
    }
  });
  
  return cookies;
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Main proxy endpoint
app.all(['/raw', '/raw/*'], async (req, res) => {
  try {
    let targetUrl;
    
    // Handle different URL patterns
    if (req.query.url) {
      targetUrl = req.query.url;
      const pathAfterRaw = req.path.replace('/raw', '');
      if (pathAfterRaw && pathAfterRaw !== '/') {
        targetUrl += pathAfterRaw;
      }
    } else if (req.params[0]) {
      targetUrl = req.params[0];
      if (!targetUrl.startsWith('http')) {
        targetUrl = 'https://' + targetUrl;
      }
    } else {
      return res.status(400).json({ error: 'Missing target URL' });
    }

    // Ensure URL is properly decoded
    targetUrl = decodeURIComponent(targetUrl);
    
    console.log('Target URL:', targetUrl);

    // Validate URL
    try {
      new URL(targetUrl);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid URL: ' + targetUrl });
    }

    // Build axios config
    const axiosConfig = {
      method: req.method,
      url: targetUrl,
      headers: {},
      timeout: 30000,
      maxRedirects: 5,
      validateStatus: null, // Don't throw on any status
    };

    // Copy relevant headers from the original request
    const skipHeaders = [
      'host', 'connection', 'content-length', 'accept-encoding', 'cookie',
      'x-forwarded-for', 'x-forwarded-proto', 'x-forwarded-host'
    ];

    Object.entries(req.headers).forEach(([key, value]) => {
      if (!skipHeaders.includes(key.toLowerCase())) {
        axiosConfig.headers[key] = value;
      }
    });

    // Check for authentication cookies passed via custom header
    const authCookies = req.headers['x-acumatica-cookies'];
    if (authCookies) {
      axiosConfig.headers['cookie'] = authCookies;
      console.log('Using auth cookies from header:', authCookies);
    }

    // Handle request body for POST/PUT/PATCH
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      axiosConfig.data = req.body;
      
      // Ensure content-type is set
      if (!axiosConfig.headers['content-type'] && typeof req.body === 'object') {
        axiosConfig.headers['content-type'] = 'application/json';
      }
    }

    console.log('Making request with config:', {
      method: axiosConfig.method,
      url: axiosConfig.url,
      headers: axiosConfig.headers,
      hasData: !!axiosConfig.data
    });

    // Make the request
    const response = await axios(axiosConfig);
    
    // Extract cookies from response
    const responseCookies = parseCookies(response.headers['set-cookie']);
    
    console.log('Response received:', {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      dataType: typeof response.data,
      cookies: responseCookies
    });

    // Forward response headers
    const responseHeaders = {};
    Object.entries(response.headers).forEach(([key, value]) => {
      const lowerKey = key.toLowerCase();
      if (!['content-encoding', 'transfer-encoding', 'connection'].includes(lowerKey)) {
        responseHeaders[key] = value;
      }
    });

    // Ensure CORS headers
    responseHeaders['Access-Control-Allow-Origin'] = '*';
    responseHeaders['Access-Control-Allow-Credentials'] = 'true';
    responseHeaders['Access-Control-Expose-Headers'] = '*';
    
    // Add cookies as a custom header so the browser can access them
    if (Object.keys(responseCookies).length > 0) {
      responseHeaders['X-Acumatica-Cookies'] = JSON.stringify(responseCookies);
    }

    // Set all headers at once
    res.set(responseHeaders);

    // Send response
    res.status(response.status).send(response.data);

  } catch (error) {
    console.error('\nProxy error details:');
    console.error('Message:', error.message);
    console.error('Code:', error.code);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      console.error('Response headers:', error.response.headers);
      
      // Forward the actual error from the target server
      res.status(error.response.status).json({
        error: error.message,
        status: error.response.status,
        data: error.response.data
      });
    } else if (error.request) {
      console.error('No response received');
      console.error('Request:', error.config?.url);
      res.status(502).json({
        error: 'No response from target server',
        details: error.message
      });
    } else {
      console.error('Error:', error.stack);
      res.status(500).json({
        error: 'Proxy server error',
        details: error.message
      });
    }
  }
});

// Handle preflight requests
app.options('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.set('Access-Control-Allow-Headers', '*');
  res.set('Access-Control-Max-Age', '3600');
  res.status(204).send();
});

// 404 handler
app.use((req, res) => {
  console.log('404 Not Found:', req.originalUrl);
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Express error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

app.listen(PORT, () => {
  console.log(`CORS proxy server running on port ${PORT}`);
  console.log(`Usage: http://localhost:${PORT}/raw?url=YOUR_URL_HERE`);
  console.log('Ready to proxy requests...\n');
});