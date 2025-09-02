# GetawayDirect

A browser extension and API service that helps users find direct booking options for vacation rentals by bypassing third-party booking platforms.

### Support this project

help keep the project free and open source: https://buymeacoffee.com/fliellerjulian

## 🚀 Features

- **Browser Extension**: Chrome extension that analyzes vacation rental listings
- **Direct Booking Detection**: Finds direct booking websites for vacation rentals
- **Multi-Platform Support**: Works with Airbnb, Booking.com, and other major platforms
- **Image Recognition**: Uses Google Lens API to find similar properties
- **Smart Filtering**: Prioritizes direct booking options over third-party portals

## 📁 Project Structure

```
getawaydirect/
├── api/                 # Flask API backend
│   ├── main.py         # Main API endpoints
│   ├── serp_api.py     # SerpAPI integration
│   ├── urls.py         # URL normalization utilities
├── extension/          # Chrome browser extension
│   ├── manifest.json   # Extension manifest
│   ├── background.js   # Extension background script
│   ├── content.js      # Content script for web pages
│   └── assets/         # Extension assets and icons
├── website/           # Landing page and documentation
└── requirements.txt   # Python dependencies
```

## 🛠️ Setup & Installation

### Prerequisites

- Python 3.8+
- Chrome browser (for extension)
- SerpAPI account and API keys

### Backend API Setup

#### Quick Setup (Recommended)

```bash
git clone https://github.com/yourusername/getawaydirect.git
cd getawaydirect
python3 setup.py
```

#### Manual Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/getawaydirect.git
   cd getawaydirect
   ```

2. **Install Python dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   The setup script will create environment files in both api and extension folders:

   ```bash
   # The setup script creates:
   # - api/.env (for SerpAPI keys)
   # Edit both files with your actual values
   ```

4. **Test your API keys**

   ```bash
   cd api
   python test_keys.py
   ```

5. **Run the API server**

   ```bash
   cd api
   python main.py
   ```

   The API will be available at `http://127.0.0.1:5000`

### Browser Extension Setup

1. **Load the extension in Chrome**

   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked" and select the `extension/` folder

2. **Extension is automatically configured**

   - The extension uses the API URL from `extension/constants.js` - set to `http://127.0.0.1:5000` by default
   - No manual configuration needed!

3. **Use the extension**
   - open airbnb.com, click on any listing and see the getaway.direct container being displayed

### Manual Testing

1. Start the API server
2. Visit airbnb.com
3. Use the browser extension to find direct booking options

## 📡 API Endpoints

### GET /search

Search for direct booking options for a vacation rental.

**Query Parameters:**

- `imageUrl` (required): URL of the property image
- `title` (required): Property title/name
- `subtitle` (optional): Property subtitle/description
- `location` (optional): Property location for better matching

**Response:**

```json
{
  "direct": [
    {
      "link": "https://direct-booking-site.com/property",
      "title": "Property Title",
      "source": "Direct Booking Site"
    }
  ],
  "portals": [
    {
      "link": "https://booking-portal.com/property",
      "title": "Property Title",
      "source": "Booking Portal"
    }
  ],
  "socials": [
    {
      "link": "https://facebook.com/property",
      "title": "Property Title",
      "source": "Facebook"
    }
  ]
}
```

### GET /

Health check endpoint.

**Response:**

```json
{
  "message": "Hello, how can I help?"
}
```

## 🔧 Configuration

### SerpAPI Keys

The system supports multiple SerpAPI keys for better reliability. Add your keys to the `.env` file:

```bash
serp_api_key_1=your_key_3
# ... up to serp_api_key_20
```

The system will automatically:

- Check credit availability for each key
- Use the first key with sufficient credits (≥2 requests)
- Fall back to other keys if needed

### CORS Configuration

The API is configured to accept requests from any domain (`origins="*"`). For production, consider restricting this to specific domains.

### Extension Configuration

The browser extension uses the API URL from `extension/background.js`:

- **Local Development**: `http://127.0.0.1:5000`

To change the API URL:

1. Edit line 7 in `extension/constants.js`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [SerpAPI](https://serpapi.com/) for search and image recognition APIs
- [Flask](https://flask.palletsprojects.com/) for the web framework
- [Chrome Extensions API](https://developer.chrome.com/docs/extensions/) for browser integration

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/getawaydirect/issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🔄 Changelog

### v1.0.0

- Initial release
- Browser extension for Chrome
- Flask API backend
- SerpAPI integration
- Direct booking detection
