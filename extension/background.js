importScripts("ExtPay.js");

var extpay = ExtPay("getawaydirect");
extpay.startBackground();

chrome.runtime.onMessage.addListener(function (
  message,
  sender,
  senderResponse
) {
  if (message.type === "searchImage") {
    let url;
    if (message.location) {
      url = `https://api.getaway.direct/search?imageUrl=${message.imageUrl}&title=${message.name}&subtitle=${message.subtitle}&location=${message.location}`;
    } else {
      url = `https://api.getaway.direct/search?imageUrl=${message.imageUrl}&title=${message.name}&subtitle=${message.subtitle}`;
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
