from flask import Flask, request, jsonify
import requests
import urllib.parse
import os
from dotenv import load_dotenv
import traceback
from urls import normalize_url
from concurrent.futures import ThreadPoolExecutor

load_dotenv()
apikey = os.environ['serp_api_key']
app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Hello, how can I help?'})

@app.route('/search', methods=['GET'])
def search():
    try:
        imageUrl = request.args.get('imageUrl')
        title = request.args.get('title')
        subtitle = request.args.get('subtitle')

        res = {
            "direct": [],
            "portals": [],
            "socials": []
        }

        lensUrl = f'https://serpapi.com/search.json?engine=google_lens&url={imageUrl}&api_key={apikey}'
        searchUrl_title = f'https://serpapi.com/search.json?engine=google&q={urllib.parse.quote(title)}&api_key={apikey}'
        #searchUrl_subtitle = f'https://serpapi.com/search.json?engine=google&q={urllib.parse.quote(subtitle)}&api_key={apikey}'

        # Define the functions to fetch data
        def fetch_data(url):
            return requests.get(url).json()

        # Run requests concurrently
        with ThreadPoolExecutor() as executor:
            futures = {
                "lens": executor.submit(fetch_data, lensUrl),
                "title": executor.submit(fetch_data, searchUrl_title),
                #"subtitle": executor.submit(fetch_data, searchUrl_subtitle)
            }
            lensResponse = futures["lens"].result()
            searchResponse_title = futures["title"].result()
            #searchResponse_subtitle = futures["subtitle"].result()

        # Initialize flags for socials
        added_facebook = False
        added_instagram = False

        # Process the results
        for result in lensResponse.get('visual_matches', []):
            link = normalize_url(result["link"])

            if ("airbnb" in result["source"].lower()
                or any(link in normalize_url(i["link"]) for i in res["direct"])
                or any(link in normalize_url(i["link"]) for i in res["portals"])
                or any(link in normalize_url(i["link"]) for i in res["socials"])):
                continue
            
            # Check for socials
            elif result["source"].lower() == "facebook" and not added_facebook:
                res["socials"].append(result)
                added_facebook = True
            elif result["source"].lower() == "instagram" and not added_instagram:
                res["socials"].append(result)
                added_instagram = True
            
            # Check for matches in title and subtitle search results -> removed subtitle for now
            elif (any(link in normalize_url(i["link"]) for i in searchResponse_title.get("organic_results", []))):
                  #or any(link in normalize_url(i["link"]) for i in searchResponse_subtitle.get("organic_results", []))):
                if result["source"].lower() in [
                    "expedia", "booking.com", "hotels.com", "airbnb", "tripadvisor",
                    "travelocity", "kayak", "agoda", "orbitz", "priceline", "trivago",
                    "vrbo", "homeaway", "hoteltonight", "momondo", "skyscanner",
                    "hostelworld", "ebookers", "cheapoair", "lastminute.com", "otelz",
                    "snaptravel"]:
                    res["portals"].append(result)
                else:
                    res["direct"].append(result)

        return jsonify(res), 200

    except Exception as e:
        print(traceback.format_exc())
        return jsonify({'error': str(e)}), 500


@app.route('/submit', methods=['GET'])
def submit():
    try:
        current_url = request.args.get('current_url')
        submitted_url = request.args.get('submitted_url')

    except Exception as e:
        print(traceback.format_exc())
        return jsonify({'error': str(e)}), 500

''' 
if __name__ == '__main__':
    app.run()
'''
