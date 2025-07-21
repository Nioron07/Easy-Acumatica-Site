// This script runs in the background thread

// Load the Pyodide script
import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.mjs";


let pyodide;

// This function loads Pyodide and all necessary packages
async function loadPyodideAndPackages() {
  pyodide = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
  });
  await pyodide.loadPackage(['micropip']);
  const micropip = pyodide.pyimport('micropip');
  
  // Install your Python packages
  await micropip.install(['requests', 'pyodide-http', 'easy-acumatica']);
  
  // IMPORTANT: The network patch must be applied here, inside the worker
  await pyodide.runPythonAsync(`
import pyodide_http
pyodide_http.patch_all()

# Your custom AcumaticaSession patch also moves here
import requests
import json
from urllib.parse import urljoin

class AcumaticaSession(requests.Session):
    """Custom session that handles cookies through the CORS proxy"""
    def __init__(self, proxy_base='http://localhost:3001/raw?url='):
        super().__init__()
        self.proxy_base = proxy_base
        self.acumatica_cookies = {}
        import builtins
        if not hasattr(builtins, '_acumatica_session_cookies'):
            builtins._acumatica_session_cookies = {}
        self.acumatica_cookies = builtins._acumatica_session_cookies
    def request(self, method, url, **kwargs):
        if self.acumatica_cookies:
            cookie_string = '; '.join([f'{k}={v}' for k, v in self.acumatica_cookies.items()])
            if 'headers' not in kwargs:
                kwargs['headers'] = {}
            kwargs['headers']['X-Acumatica-Cookies'] = cookie_string
        if not url.startswith(self.proxy_base):
            if 'acumatica.com' in url:
                url = self.proxy_base + url
        response = super().request(method, url, **kwargs)
        cookies_header = response.headers.get('X-Acumatica-Cookies')
        if cookies_header:
            try:
                new_cookies = json.loads(cookies_header)
                self.acumatica_cookies.update(new_cookies)
                import builtins
                builtins._acumatica_session_cookies = self.acumatica_cookies
            except json.JSONDecodeError:
                pass
        return response

requests.Session = AcumaticaSession
  `);
  // Send a message to the main thread that we are ready
  self.postMessage({ type: 'ready' });
}

const pyodideReadyPromise = loadPyodideAndPackages();

// Listen for messages from the main UI thread
self.onmessage = async (event) => {
  // Wait for Pyodide to be fully initialized
  await pyodideReadyPromise;
  
  const { code } = event.data;

  try {
    // Capture Python's print output
    let output = '';
    pyodide.globals.set('print', (s) => {
      output += s + '\\n';
    });
    
    // Execute the python code
    await pyodide.runPythonAsync(code);
    
    // Send the success result back to the main thread
    self.postMessage({ type: 'success', output: output || 'Code executed successfully!' });
  } catch (error) {
    // Send the error result back to the main thread
    self.postMessage({ type: 'error', error: error.message });
  }
};