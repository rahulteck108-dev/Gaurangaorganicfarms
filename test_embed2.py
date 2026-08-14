import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

video_ids = ["T4M9H3QO29o", "V2eYw02hWc4", "n3Xv_g3g-mA", "y7uL77n3r5k", "HBSHkH2kIfk", "OQO7YI_yYxk"]
for vid in video_ids:
    url = f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={vid}&format=json"
    try:
        response = urllib.request.urlopen(url, context=ctx)
        data = json.loads(response.read().decode('utf-8'))
        print(f"{vid}: Embeddable - {data.get('title')}")
    except Exception as e:
        print(f"{vid}: Error - {e}")
