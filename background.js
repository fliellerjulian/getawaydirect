importScripts("ExtPay.js");

var extpay = ExtPay("pinfold");
extpay.startBackground();

chrome.runtime.onMessage.addListener(function (
  message,
  sender,
  senderResponse
) {
  if (message.type === "searchImage") {
    fetch(
      `https://serpapi.com/search.json?engine=google_lens&url=${message.imageUrl}&api_key=5facfeef266dc1e7a8a3b49fdce5538e9dd4eead1828f0350c06fcc41dc09e2d`,
      {
        method: "GET",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        senderResponse(res);
      });
  }
  return true;
});
