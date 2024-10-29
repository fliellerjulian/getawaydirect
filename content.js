window.addEventListener("load", function () {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const mainImage = document.getElementById("FMP-target");
      const name = document
        .getElementsByClassName("_1czgyoo")[0]
        .querySelector("h1").textContent;

      if (mainImage && !document.getElementById("getaway-list")) {
        console.log("mainImage", mainImage["src"]);
        chrome.runtime.sendMessage(
          {
            type: "searchImage",
            imageUrl: mainImage["src"],
            name: name,
          },
          (response) => {
            buildList(response);
          }
        );
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
