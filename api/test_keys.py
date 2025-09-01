#!/usr/bin/env python3
"""
Test script to verify SerpAPI keys are working correctly.
Run this script to check if your API keys have sufficient credits.
"""

import os
from dotenv import load_dotenv
from serp_api import check_serpapi_credits, get_valid_api_key

def test_api_keys():
    """Test all configured API keys and show their status."""
    load_dotenv()
    
    print("🔑 Testing SerpAPI Keys...")
    print("=" * 50)
    
    # Get all possible API keys
    api_keys = [
        os.getenv(f"serp_api_key_{i}") for i in range(1, 22)
    ]
    
    valid_keys = []
    total_credits = 0
    
    for i, key in enumerate(api_keys):
        if key:
            print(f"Testing key {i+1}...", end=" ")
            credits = check_serpapi_credits(key)
            if credits > 0:
                print(f"✅ {credits} credits available")
                valid_keys.append(key)
                total_credits += credits
            else:
                print("❌ No credits or invalid key")
        else:
            print(f"Key {i+1}: Not configured")
    
    print("\n" + "=" * 50)
    print(f"📊 Summary:")
    print(f"   Valid keys: {len(valid_keys)}")
    print(f"   Total credits: {total_credits}")
    
    if valid_keys:
        print("✅ You have working API keys!")
        
        # Test getting a valid key
        working_key = get_valid_api_key()
        if working_key:
            print("✅ get_valid_api_key() is working correctly")
        else:
            print("❌ get_valid_api_key() failed - no keys with sufficient credits")
    else:
        print("❌ No valid API keys found!")
        print("\n💡 Make sure to:")
        print("   1. Create a .env file")
        print("   2. Add your SerpAPI keys to the .env file")
        print("   3. Get API keys from https://serpapi.com/")

if __name__ == "__main__":
    test_api_keys()
