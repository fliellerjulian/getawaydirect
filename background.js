importScripts("ExtPay.js");

var extpay = ExtPay("pinfold");
extpay.startBackground();

chrome.runtime.onMessage.addListener(function (
  message,
  sender,
  senderResponse
) {
  if (message.type === "searchImage") {
    const lensUrl = `https://serpapi.com/search.json?engine=google_lens&url=${message.imageUrl}&api_key=5facfeef266dc1e7a8a3b49fdce5538e9dd4eead1828f0350c06fcc41dc09e2d`;
    const searchUrl = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(
      message.name
    )}&api_key=5facfeef266dc1e7a8a3b49fdce5538e9dd4eead1828f0350c06fcc41dc09e2d`;

    // Fetch both Lens and Search results concurrently
    Promise.all([fetch(lensUrl), fetch(searchUrl)])
      .then(([lensRes, searchRes]) =>
        Promise.all([lensRes.json(), searchRes.json()])
      )
      .then(([lensData, searchData]) => {
        const visualMatches = lensData.visual_matches || [];
        const organicResults = searchData.organic_results || [];
        const inlineImages = searchData.inline_images || [];

        // Filter matches:
        // 1. Match by URL in organicResults or inlineImages
        // 2. Include if source is Instagram or Facebook
        const matchedResults = visualMatches.filter((lensItem) => {
          const isInOrganicResults = organicResults.some(
            (searchItem) => searchItem.link === lensItem.link
          );
          const isInInlineImages = inlineImages.some(
            (imageItem) => imageItem.link === lensItem.link
          );
          const isFromSocialMedia =
            lensItem.source === "Instagram" || lensItem.source === "Facebook";

          return isInOrganicResults || isInInlineImages || isFromSocialMedia;
        });

        // Send matched results back to content.js
        senderResponse({ success: true, data: matchedResults });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        senderResponse({ success: false, error: error.message });
      });
  }

  return true;
});
