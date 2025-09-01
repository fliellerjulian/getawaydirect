#!/usr/bin/env python3
"""
Setup script for GetawayDirect
This script helps you set up the project quickly.
"""

import os
import sys
import subprocess
from pathlib import Path
from dotenv import load_dotenv

def run_command(command, description):
    """Run a command and handle errors."""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e}")
        print(f"Error output: {e.stderr}")
        return False

def check_python_version():
    """Check if Python version is compatible."""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 8):
        print("❌ Python 3.8+ is required")
        print(f"Current version: {version.major}.{version.minor}.{version.micro}")
        return False
    print(f"✅ Python {version.major}.{version.minor}.{version.micro} is compatible")
    return True

def create_env_file():
    """Create .env file if it doesn't exist."""
    env_file = Path(".env")
    if env_file.exists():
        print("✅ .env file already exists")
        return True
    
    print("📝 Creating .env file...")
    try:
        with open(env_file, "w") as f:
            f.write("# API Configuration\n")
            f.write("BASE_URL=http://127.0.0.1:5000\n\n")
            f.write("# SerpAPI Configuration\n")
            f.write("# Get your API keys from https://serpapi.com/\n\n")
            f.write("# Add your API keys here:\n")
            f.write("serp_api_key_1=your_first_api_key_here\n")
            f.write("serp_api_key_2=your_second_api_key_here\n")
            f.write("serp_api_key_3=your_third_api_key_here\n")
            f.write("# Add more keys as needed (up to serp_api_key_20)\n")
        
        print("✅ .env file created")
        print("⚠️  Please edit .env file and add your actual SerpAPI keys")
        return True
    except Exception as e:
        print(f"❌ Failed to create .env file: {e}")
        return False

def generate_extension_config():
    """Generate extension config.js from .env file."""
    load_dotenv()
    
    base_url = os.getenv('BASE_URL', 'http://127.0.0.1:5000')
    config_file = Path("extension/config.js")
    
    print(f"🔧 Generating extension config with API URL: {base_url}")
    
    try:
        with open(config_file, "w") as f:
            f.write("// Extension configuration\n")
            f.write("// This file is auto-generated from .env file\n")
            f.write("// Update your .env file and run setup.py to regenerate\n\n")
            f.write(f"const CONFIG = {{\n")
            f.write(f"    API_URL: '{base_url}'\n")
            f.write("};\n")
        
        print("✅ Extension config generated")
        return True
    except Exception as e:
        print(f"❌ Failed to generate extension config: {e}")
        return False

def print_extension_setup():
    """Print extension setup instructions."""
    print("\n🌐 Browser Extension Setup")
    print("=" * 50)
    print("1. Open Chrome and go to chrome://extensions/")
    print("2. Enable 'Developer mode' (toggle in top right)")
    print("3. Click 'Load unpacked' and select the 'extension/' folder")
    print("4. The extension is now configured to use your API URL!")
print("\n💡 To change the API URL:")
print("   - Edit the BASE_URL in your .env file")
print("   - Run: python3 setup.py")
print("   - Reload the extension")

def main():
    """Main setup function."""
    print("🚀 GetawayDirect Setup")
    print("=" * 50)
    
    # Check Python version
    if not check_python_version():
        sys.exit(1)
    
    # Install dependencies
    if not run_command("pip install -r requirements.txt", "Installing Python dependencies"):
        print("💡 Try running: pip install -r requirements.txt manually")
        sys.exit(1)
    
    # Create .env file
    create_env_file()
    
    # Generate extension config
    generate_extension_config()
    
    # Test API keys
    print("\n🔑 Testing API keys...")
    if os.path.exists("api/test_keys.py"):
        os.chdir("api")
        run_command("python3 test_keys.py", "Testing API keys")
        os.chdir("..")
    
    # Print extension setup instructions
    print_extension_setup()
    
    print("\n" + "=" * 50)
    print("🎉 Setup completed!")
    print("\n📋 Next steps:")
    print("   1. Edit .env file and add your SerpAPI keys")
    print("   2. Run: cd api && python3 main.py")
    print("   3. Load the browser extension (see instructions above)")
    print("\n📖 See README.md for detailed instructions")

if __name__ == "__main__":
    main()
