import requests
import os
from dotenv import load_dotenv


load_dotenv()

# Get all API keys from .env file
API_KEYS = [
    os.getenv(f"serp_api_key_{i}") for i in range(1, 21)
]
API_KEYS.append(os.getenv("serp_api_key_julian"))
API_KEYS.append(os.getenv("serp_api_key_eliz"))

def check_serpapi_credits(api_key):
    """Check the remaining credits for a given SerpApi key."""
    try:
        url = f'https://serpapi.com/account?api_key={api_key}'
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return data.get("total_searches_left", 0)
    except Exception as e:
        print(f"Error checking key {api_key}: {e}")
        return 0

def get_valid_api_key():
    """Return the first API key with at least 2 available requests."""
    for api_key in API_KEYS:
        if api_key:
            remaining_credits = check_serpapi_credits(api_key)
            #print(f"API Key: {api_key} - Remaining Requests: {remaining_credits}")
            if remaining_credits >= 2:
                #print(f"Using API Key: {api_key}")
                return api_key
    print("No API key with sufficient credits found.")
    return None

