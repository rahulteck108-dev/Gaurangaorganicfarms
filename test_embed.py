import urllib.request
import json

video_ids = ["T4M9H3QO29o", "V2eYw02hWc4", "O_u69eibVw8", "1k_M2-0kofQ", "Mpw8qH_Uo3k", "uCnjqFvR6U8", "w8f9rKnb_A4"]
for vid in video_ids:
    url = f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={vid}&format=json"
    try:
        response = urllib.request.urlopen(url)
        data = json.loads(response.read().decode('utf-8'))
        print(f"{vid}: Embeddable - {data.get('title')}")
    except Exception as e:
        print(f"{vid}: Error - {e}")
