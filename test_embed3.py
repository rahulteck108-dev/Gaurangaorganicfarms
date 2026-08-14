import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

video_id = "3nO0y1pSgD8" # hebbers kitchen ghee recipe
url = f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={video_id}&format=json"
try:
    response = urllib.request.urlopen(url, context=ctx)
    data = json.loads(response.read().decode('utf-8'))
    print(f"SUCCESS: {data.get('title')}")
except Exception as e:
    print(f"ERROR: {e}")
