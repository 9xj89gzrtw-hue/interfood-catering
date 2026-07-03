#!/usr/bin/env python3
"""Lightweight HTTP server for the Interfood Catering static site."""
import http.server
import socketserver
import os
import sys
from pathlib import Path

PORT = 3000
DIRECTORY = "/home/z/my-project/out"

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    """Handler that serves static files with SPA-like fallback."""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def do_GET(self):
        # Strip query string for file lookup
        path = self.path.split('?')[0]
        
        # Try exact file first
        file_path = Path(DIRECTORY) / path.lstrip('/')
        if file_path.is_file():
            return super().do_GET()
        
        # Try path + .html
        html_path = Path(DIRECTORY) / (path.lstrip('/') + '.html')
        if html_path.is_file():
            self.path = path + '.html'
            return super().do_GET()
        
        # Try path/index.html
        index_path = Path(DIRECTORY) / path.lstrip('/') / 'index.html'
        if index_path.is_file():
            self.path = path + '/index.html'
            return super().do_GET()
        
        # Fallback to 404
        return super().do_GET()
    
    def end_headers(self):
        # Add cache headers for static assets
        if '/_next/static/' in self.path or '/images/' in self.path or '/icons/' in self.path:
            self.send_header('Cache-Control', 'public, max-age=31536000, immutable')
        elif self.path.endswith('/sw.js'):
            self.send_header('Cache-Control', 'no-cache')
            self.send_header('Service-Worker-Allowed', '/')
        # Security headers
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'SAMEORIGIN')
        super().end_headers()

class ThreadedServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True

if __name__ == '__main__':
    os.chdir(DIRECTORY)
    with ThreadedServer(("0.0.0.0", PORT), SPAHandler) as httpd:
        print(f"Serving on http://0.0.0.0:{PORT}")
        sys.stdout.flush()
        httpd.serve_forever()
