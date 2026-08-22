import os
import sys
import http.server
import urllib.request
import urllib.error
import shutil

PORT = 8080
CANVA_HOST = "https://463y54ydgeht.my.canva.site"

class CanvaProxyHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Force no-cache so browser immediately loads updated index.html
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path.startswith('/_api/'):
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b'{"status":"ok"}')
        else:
            self.send_error(501, "Unsupported method")

    def do_GET(self):
        clean_path = self.path.split('?')[0]
        local_path = self.translate_path(clean_path)
        
        if os.path.exists(local_path) and not os.path.isdir(local_path):
            super().do_GET()
            return

        if clean_path.startswith('/_assets/'):
            cdn_url = f"{CANVA_HOST}{self.path}"
            print(f"Proxying: {self.path} -> {cdn_url}")
            try:
                req = urllib.request.Request(
                    cdn_url,
                    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
                )
                with urllib.request.urlopen(req) as response:
                    self.send_response(response.status)
                    for header in ['Content-Type', 'Content-Encoding', 'Cache-Control']:
                        val = response.headers.get(header)
                        if val:
                            self.send_header(header, val)
                    self.end_headers()
                    shutil.copyfileobj(response, self.wfile)
                return
            except urllib.error.HTTPError as e:
                print(f"Proxy error {e.code} for {self.path}")
                self.send_error(e.code, f"Proxy failed: {e.msg}")
                return
            except Exception as e:
                print(f"Proxy connection failed: {e}")
                self.send_error(502, f"Bad Gateway: {str(e)}")
                return

        super().do_GET()

if __name__ == "__main__":
    if len(sys.argv) > 1:
        try:
            PORT = int(sys.argv[1])
        except ValueError:
            pass

    server_address = ('', PORT)
    httpd = http.server.HTTPServer(server_address, CanvaProxyHandler)
    print(f"Serving Canva website with proxy on http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server.")
        sys.exit(0)
