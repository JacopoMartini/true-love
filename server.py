from http.server import SimpleHTTPRequestHandler, HTTPServer
import urllib.request
import json
import os


class Handler(SimpleHTTPRequestHandler):

    def do_GET(self):

        if self.path == "/api/market":

            url = (
                "https://query1.finance.yahoo.com/v8/finance/chart/"
                "FTSEMIB.MI?range=5d&interval=1m"
            )

            request = urllib.request.Request(
                url,
                headers={"User-Agent": "Mozilla/5.0"}
            )

            try:
                with urllib.request.urlopen(request) as response:
                    data = json.loads(response.read())

                result = data["chart"]["result"][0]
                meta = result["meta"]

                price = meta["regularMarketPrice"]
                previous = meta["chartPreviousClose"]

                change = ((price - previous) / previous) * 100

                output = {
                    "price": price,
                    "change": round(change, 2)
                }

                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()

                self.wfile.write(json.dumps(output).encode())

            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()

                self.wfile.write(
                    json.dumps({"error": str(e)}).encode()
                )

            return

        super().do_GET()


port = int(os.environ.get("PORT", 8000))

print("TRUE LOVE SERVER RUNNING")
print(f"Running on port {port}")

HTTPServer(("0.0.0.0", port), Handler).serve_forever()