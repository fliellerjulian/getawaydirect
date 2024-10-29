window.addEventListener("load", function () {
  console.log("TEST");
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const mainImage = document.getElementById("FMP-target");
      const found = document.createElement("div");
      found.id = "imageFound";

      if (mainImage && !document.getElementById("imageFound")) {
        console.log("mainImage", mainImage["src"]);
        document.body.appendChild(found);
        chrome.runtime.sendMessage(
          {
            type: "searchImage",
            imageUrl: mainImage["src"],
          },
          (response) => {
            console.log(response);
          }
        );
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
