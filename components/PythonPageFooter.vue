<template>
  <v-footer class="docs-footer">
    <div class="footer-gradient"></div>
    <v-container class="footer-content">
      <!-- Main Footer Content -->
      <v-row>
        <!-- About Section -->
        <v-col cols="12" md="4" class="mb-4">
          <h3 class="footer-title mb-3">Easy-Acumatica Python</h3>
          <p class="footer-text">
            A dynamic API wrapper that adapts to your Acumatica instance. 
            Version 0.4.0 introduces fully dynamic service and model generation.
          </p>
          <div class="version-info mt-3">
            <v-chip size="small" variant="outlined" color="white">
              v0.4.0
            </v-chip>
            <v-chip size="small" variant="outlined" color="white" class="ml-2">
              Python 3.7+
            </v-chip>
          </div>
        </v-col>

        <!-- Quick Links -->
        <v-col cols="12" sm="6" md="2" class="mb-4">
          <h4 class="footer-subtitle mb-3">Documentation</h4>
          <ul class="footer-links">
            <li><a href="/python/quickstart">Quickstart</a></li>
            <li><a href="/python/client">Client Guide</a></li>
            <li><a href="/python/service-factory">Services</a></li>
            <li><a href="/python/model-factory">Models</a></li>
            <li><a href="/python/api-reference">API Reference</a></li>
          </ul>
        </v-col>

        <!-- Resources -->
        <v-col cols="12" sm="6" md="2" class="mb-4">
          <h4 class="footer-subtitle mb-3">Resources</h4>
          <ul class="footer-links">
            <li><a href="/python/examples">Examples</a></li>
            <li><a href="/python/migration">Migration Guide</a></li>
            <li><a href="/python/faq">FAQ</a></li>
            <li><a href="/python/changelog">Changelog</a></li>
            <li><a href="https://github.com/Nioron07/Easy-Acumatica/issues" target="_blank">Support</a></li>
          </ul>
        </v-col>

        <!-- Community -->
        <v-col cols="12" md="4" class="mb-4">
          <h4 class="footer-subtitle mb-3">Community & Support</h4>
          <p class="footer-text mb-3">
            Join our community and get help with your integration projects.
          </p>
          <div class="social-links">
            <v-btn
              icon
              variant="outlined"
              color="white"
              size="small"
              href="https://github.com/Nioron07/Easy-Acumatica"
              target="_blank"
            >
              <v-icon>mdi-github</v-icon>
            </v-btn>
            <v-btn
              icon
              variant="outlined"
              color="white"
              size="small"
              href="https://pypi.org/project/easy-acumatica/"
              target="_blank"
              class="ml-2"
            >
              <v-icon>mdi-package-variant</v-icon>
            </v-btn>
            <v-btn
              icon
              variant="outlined"
              color="white"
              size="small"
              href="https://github.com/Nioron07/Easy-Acumatica/discussions"
              target="_blank"
              class="ml-2"
            >
              <v-icon>mdi-forum</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-4" color="white" opacity="0.2"></v-divider>

      <!-- Bottom Bar -->
      <v-row align="center">
        <v-col cols="12" md="6">
          <p class="footer-copyright mb-0">
            Created by <a href="https://github.com/Nioron07" target="_blank" class="footer-link">Matthew Hirstius</a>
            <span class="mx-2">•</span>
            Contributions by <a href="https://www.chrisyxu.com/" target="_blank" class="footer-link">Chris Xu</a>
          </p>
        </v-col>
        <v-col cols="12" md="6" class="text-md-end">
          <p class="footer-copyright mb-0">
            © 2025 Easy-Acumatica. MIT License.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
.docs-footer {
  position: relative;
  background: #1a1a1a;
  color: white;
  margin-top: 5rem;
  overflow: hidden;
}

.footer-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1a237e 0%, #3949ab 25%, #5e35b1 50%, #7e57c2 100%);
  opacity: 0.9;
}

.footer-content {
  position: relative;
  z-index: 1;
  padding: 3rem 0 2rem;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.footer-subtitle {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.footer-text {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: white;
}

.footer-link {
  color: white;
  font-weight: 500;
}

.footer-copyright {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
}

.version-info {
  display: flex;
  align-items: center;
}

.social-links {
  display: flex;
  align-items: center;
}

/* Responsive */
@media (max-width: 960px) {
  .footer-content {
    padding: 2rem 0 1rem;
  }
  
  .footer-title {
    font-size: 1.25rem;
  }
}
</style>