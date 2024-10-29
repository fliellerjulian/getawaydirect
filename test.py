from serpapi import GoogleSearch

params = {
  "engine": "google_lens",
  "url": "https://a0.muscache.com/im/pictures/miso/Hosting-1053448582679511658/original/a8b89116-4ab3-42fa-b102-9de03781e6ac.jpeg?im_w=1200",
  "api_key": "5facfeef266dc1e7a8a3b49fdce5538e9dd4eead1828f0350c06fcc41dc09e2d"
}

search = GoogleSearch(params)
results = search.get_dict()
visual_matches = results["visual_matches"]
print(visual_matches)