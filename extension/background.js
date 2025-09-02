/**
 * Background script for Getaway Direct extension
 * Handles API communication and extension lifecycle events
 */

import { API_CONFIG, EXTERNAL_URLS } from "./background-constants.js";

/**
 * Listens for messages from content scripts
 * @param {Object} message - The message object containing search parameters
 * @param {Object} sender - Information about the sender
 * @param {Function} senderResponse - Function to send response back to sender
 * @returns {boolean} - Returns true to indicate async response
 */
chrome.runtime.onMessage.addListener(function (
  message,
  _sender,
  senderResponse
) {
  if (message.type === "searchImage") {
    let url;
    if (message.location) {
      url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SEARCH}?imageUrl=${message.imageUrl}&title=${message.name}&subtitle=${message.subtitle}&location=${message.location}`;
    } else {
      url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SEARCH}?imageUrl=${message.imageUrl}&title=${message.name}&subtitle=${message.subtitle}`;
    }
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          // Handle non-200 status codes by sending an error response
          senderResponse({
            success: false,
            error: `Server returned status ${res.status}`,
          });
          return Promise.reject(new Error(`HTTP status ${res.status}`));
        }
        return res.json();
      })
      .then((json) => {
        senderResponse({ success: true, data: json });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        senderResponse({ success: false, error: error.message });
      });

    return true; // Ensures async `sendResponse` works as expected
  }
});

/**
 * Sets the URL to open when the extension is uninstalled
 * Redirects users to a feedback form
 */
chrome.runtime.setUninstallURL(EXTERNAL_URLS.UNINSTALL_FORM, function () {
  if (chrome.runtime.lastError) {
    console.error("Error setting uninstall URL:", chrome.runtime.lastError);
  }
});
