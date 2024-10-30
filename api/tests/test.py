import requests

r = requests.post("http://127.0.0.1:5000/search",json={
    "imageUrl": "https://a0.muscache.com/im/pictures/miso/Hosting-934321421663034334/original/f1e4cfe5-9483-44df-a6d7-e0a0331520bf.jpeg?im_w=1200",
    "title": "Adara Villas 11 | Brandneue Villa mit 2 Schlafzimmern in Uluwatu",
    "subtitle": "Privatunterkunft in Kecamatan Kuta Selatan, Indonesien"
})
print(r.json())