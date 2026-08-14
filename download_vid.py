import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = "https://cdn.pixabay.com/video/2020/05/26/40232-425123910_tiny.mp4"
# Actually, Pexels/Pixabay often blocks scripts. Let's try downloading a wikipedia video.
url2 = "https://upload.wikimedia.org/wikipedia/commons/4/4b/Making_of_Ghee_or_Clarified_Butter.webm"
req = urllib.request.Request(url2, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'})
try:
    with urllib.request.urlopen(req, context=ctx) as response, open('images/ghee_video.webm', 'wb') as out_file:
        data = response.read()
        out_file.write(data)
        print("Downloaded:", len(data), "bytes")
except Exception as e:
    print("Error:", e)
