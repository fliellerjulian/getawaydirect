importScripts("ExtPay.js");

var extpay = ExtPay("pinfold");
extpay.startBackground();

chrome.runtime.onMessage.addListener(function (
  message,
  sender,
  senderResponse
) {
  if (message.type === "searchImage") {
    const url = `http://127.0.0.1:5000/search?imageUrl=${message.imageUrl}&title=${message.name}&subtitle=${message.subtitle}`;
    // Send POST request to the server
    fetch(url)
      .then((res) => res.json())
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
