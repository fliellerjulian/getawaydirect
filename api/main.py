from flask import Flask, request, jsonify
import asyncio
import aiohttp
import os
from dotenv import load_dotenv
import traceback
from urls import normalize_url
import nest_asyncio
import urllib.parse
from serp_api import * 
from emails import send_email_notification

load_dotenv()
nest_asyncio.apply()  # Apply nest_asyncio to allow nested event loops

app = Flask(__name__)

# Define portal sources for easy matching
PORTAL_SOURCES = {
    "expedia", "booking.com", "hotels.com", "airbnb", "tripadvisor",
    "travelocity", "kayak", "agoda", "orbitz", "priceline", "trivago",
    "vrbo", "homeaway", "hoteltonight", "momondo", "skyscanner",
    "hostelworld", "ebookers", "cheapoair", "lastminute.com", "otelz",
    "snaptravel","traum-ferienwohnungen","hotel-mix.de","fewo-direkt.de","immowelt","agoda.com"
}

async def fetch_data(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.json()

async def fetch_all_data(lensUrl, searchUrl_title):
    return await asyncio.gather(
        fetch_data(lensUrl),
        fetch_data(searchUrl_title)
    )

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Hello, how can I help?'})

@app.route('/search', methods=['GET'])
def search():
    try:
        imageUrl = request.args.get('imageUrl')
        title = request.args.get('title')
        subtitle = request.args.get('subtitle')
        
        location = request.args.get('location',None)
        location_ = None
        if location:
            location = location.lower()
            location_ = location.replace("ä","a").replace("ö","o").replace("ü","u").replace("ß","ss")
        
        res = {
            "direct": [],
            "portals": [],
            "socials": []
        }
        
        if len(title) <= 20:
            title = f"{title} {subtitle}"

        apikey = get_valid_api_key()
        if not apikey:
            send_email_notification(
                subject="Urgent: No valid API key found!",
                body="All available API for getaway.direct are invalid"
            )
            return jsonify({'error': 'No valid API key found.'}), 500
        
        lensUrl = f'https://serpapi.com/search.json?engine=google_lens&url={imageUrl.split("?")[0]}&api_key={apikey}'
        searchUrl_title = f'https://serpapi.com/search.json?engine=google&q={urllib.parse.quote(title)}&api_key={apikey}'

        # Fetch data asynchronously
        lensResponse, searchResponse_title = asyncio.run(fetch_all_data(lensUrl, searchUrl_title))

        # Process results
        title_links = {normalize_url(i["link"]) for i in searchResponse_title.get("organic_results", [])}
        added_facebook = False
        added_instagram = False

        for result in lensResponse.get('visual_matches', []):
            link = normalize_url(result["link"])
            result["link"] = link
            source = result["source"].lower()
            
            # skip airbnb and duplicates
            if ("airbnb" in source
                or any(link in i["link"] for i in res["direct"])
                or any(link in i["link"] for i in res["portals"])
                ):
                continue
    
            # Social media handling with limit
            if source == "facebook":
                if not added_facebook:
                    res["socials"].append(result)
                    added_facebook = True
            elif source == "instagram":
                if not added_instagram:
                    res["socials"].append(result)
                    added_instagram = True

            # Check for matches in title search results && it´s also a likely match, if the location is in the title
            elif link in title_links or (location and location in result["title"].lower() or location_ and location_ in result["title"].lower()):
                if source in PORTAL_SOURCES:
                    res["portals"].append(result)
                else:
                    res["direct"].append(result)

        #print(res)
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

