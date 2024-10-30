from urllib.parse import urlparse, parse_qs, urlunparse
import re

def normalize_url(url):
    parsed_url = urlparse(url)
    
    # Remove the language code from the path (e.g., ".en-gb")
    path_without_lang = re.sub(r"\.[a-z]{2}-[a-z]{2}\b", "", parsed_url.path)
    
    # Rebuild the URL without query params, fragments, or language-specific parts
    normalized_url = urlunparse((
        parsed_url.scheme,
        parsed_url.netloc,
        path_without_lang.rstrip('/'),  # Remove trailing slash
        '',  # Ignore params
        '',  # Ignore query
        ''   # Ignore fragment
    ))
    
    return normalized_url