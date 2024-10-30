from flask import Flask, request, jsonify
import requests
import urllib.parse
import os
from dotenv import load_dotenv
import traceback
from urls import normalize_url
load_dotenv()


apikey = os.environ['serp_api_key']
app = Flask(__name__)


@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Hello, how can I help?'})

@app.route('/search', methods=['POST'])
def search():
    try:
        request_data = request.get_json()
        imageUrl = request_data.get('imageUrl')
        title = request_data.get('title')
        subtitle = request_data.get('subtitle')
        
        res = {
            "direct" : [],
            "portals": [],
            "socials": []
        }
        
        lensUrl = f'https://serpapi.com/search.json?engine=google_lens&url={imageUrl}&api_key={apikey}'
        searchUrl_title = f'https://serpapi.com/search.json?engine=google&q={urllib.parse.quote(title)}&api_key={apikey}'
        searchUrl_subtitle = f'https://serpapi.com/search.json?engine=google&q={urllib.parse.quote(subtitle)}&api_key={apikey}'
        print(searchUrl_title, searchUrl_subtitle)
        
        lensResponse = requests.get(lensUrl).json()
        searchResponse_title = requests.get(searchUrl_title).json()
        searchResponse_subtitle = requests.get(searchUrl_subtitle).json()
        
        added_facebook = False
        added_instagram = False
        for result in lensResponse['visual_matches']:
            #no airbnb, no duplicates
            link = normalize_url(result["link"])
            if ("airbnb" in result["source"].lower() 
                or any(link in normalize_url(i["link"]) for i in res["direct"])
                or any(link in normalize_url(i["link"]) for i in res["portals"])
                or any(link in normalize_url(i["link"]) for i in res["socials"])
                ):
                continue
            
            #socials
            elif result["source"].lower() == "facebook" and not added_facebook:
                res["socials"].append(result)
                added_facebook = True
            
            elif result["source"].lower() == "instagram" and not added_instagram:
                res["socials"].append(result)
                added_instagram = True
            
            #matches
            elif (
                any(link in normalize_url(i["link"]) for i in searchResponse_title["organic_results"])
                or any (link in normalize_url(i["link"]) for i in searchResponse_subtitle["organic_results"])
                ):
                
                if result["source"].lower() in [
                "expedia",
                "booking.com",
                "hotels.com",
                "airbnb",
                "tripadvisor",
                "travelocity",
                "kayak",
                "agoda",
                "orbitz",
                "priceline",
                "trivago",
                "vrbo",
                "homeaway",
                "hoteltonight",
                "momondo",
                "skyscanner",
                "hostelworld",
                "ebookers",
                "cheapoair",
                "lastminute.com",
                "otelz",
                "snaptravel"]:
                    res["portals"].append(result)
                else:
                    res["direct"].append(result)
        print(res)
        return jsonify(res),200
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({'error': str(e)}), 500


@app.route("/submit", methods=["POST"])
def submit():
    #TODO send to discord for now
    request_data = request.get_json()
    airbnb_url = request_data.get('airbnb_url')
    host_url = request_data.get('host_url')

    #return jsonify({'message': 'Hello, World!'})

if __name__ == '__main__':
    app.run()