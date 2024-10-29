window.addEventListener("load", function () {
  console.log("TEST");
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const mainImage = document.getElementById("FMP-target");
      if (mainImage && !document.getElementById("getaway-list")) {
        console.log("mainImage", mainImage["src"]);
        chrome.runtime.sendMessage(
          {
            type: "searchImage",
            imageUrl: mainImage["src"],
          },
          (response) => {
            buildList(response["visual_matches"]);
          }
        );
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
