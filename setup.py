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

def create_env_files():
    """Create .env files in both api and extension folders."""
    
    # Create api/.env for SerpAPI keys
    api_env_file = Path("api/.env")
    if api_env_file.exists():
        print("✅ API .env file already exists")
    else:
        print("📝 Creating API .env file...")
        try:
            with open(api_env_file, "w") as f:
                f.write("# SerpAPI Configuration\n")
                f.write("# Get your API keys from https://serpapi.com/\n\n")
                f.write("# Add your API keys here:\n")
                f.write("serp_api_key_1=your_first_api_key_here\n")
                f.write("serp_api_key_2=your_second_api_key_here\n")
                f.write("serp_api_key_3=your_third_api_key_here\n")
                f.write("# Add more keys as needed (up to serp_api_key_21)\n")
            
            print("✅ API .env file created")
            print("⚠️  Please edit api/.env file and add your actual SerpAPI keys")
        except Exception as e:
            print(f"❌ Failed to create API .env file: {e}")
            return False
    
    # Create extension/.env for BASE_URL only
    extension_env_file = Path("extension/.env")
    if extension_env_file.exists():
        print("✅ Extension .env file already exists")
    else:
        print("📝 Creating Extension .env file...")
        try:
            with open(extension_env_file, "w") as f:
                f.write("# Extension Configuration\n")
                f.write("# Set the base URL for the API server\n")
                f.write("BASE_URL=http://127.0.0.1:5000\n")
            
            print("✅ Extension .env file created")
        except Exception as e:
            print(f"❌ Failed to create Extension .env file: {e}")
            return False
    
    return True

def generate_extension_config():
    """Generate extension config in background.js from extension/.env file."""
    # Load .env from extension folder for BASE_URL
    extension_env_path = Path("extension/.env")
    if extension_env_path.exists():
        load_dotenv(extension_env_path)
    else:
        # Fallback to root .env if extension .env doesn't exist
        load_dotenv()
    
    base_url = os.getenv('BASE_URL', 'http://127.0.0.1:5000')
    background_file = Path("extension/background.js")
    
    print(f"🔧 Generating extension config with API URL: {base_url}")
    
    try:
        # Read the current background.js file
        with open(background_file, "r") as f:
            content = f.read()
        
        # Replace the CONFIG object with the new API URL
        import re
        new_config = f"const CONFIG = {{\n    API_URL: '{base_url}'\n}};"
        
        # Use regex to replace the CONFIG object
        pattern = r"const CONFIG = \{[^}]*\};"
        if re.search(pattern, content):
            new_content = re.sub(pattern, new_config, content)
        else:
            # If no CONFIG object found, insert it after the comments
            lines = content.split('\n')
            insert_index = 0
            for i, line in enumerate(lines):
                if line.strip().startswith('//') and 'CONFIG' in line:
                    insert_index = i + 1
                    break
            lines.insert(insert_index, new_config)
            new_content = '\n'.join(lines)
        
        # Write the updated content back
        with open(background_file, "w") as f:
            f.write(new_content)
        
        print("✅ Extension config generated in background.js")
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
print("   - Edit the BASE_URL in your extension/.env file")
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
    create_env_files()
    
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
    print("   1. Edit api/.env file and add your SerpAPI keys")
    print("   2. Edit extension/.env file and set your BASE_URL")
    print("   3. Run: cd api && python3 main.py")
    print("   4. Load the browser extension (see instructions above)")
    print("\n📖 See README.md for detailed instructions")

if __name__ == "__main__":
    main()
