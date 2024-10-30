window.addEventListener("load", function () {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const mainImage = document.getElementById("FMP-target");
      const titleContainer = document.getElementsByClassName("_1czgyoo")[0];
      title = titleContainer
        ? titleContainer.querySelector("h1").textContent
        : null;

      if (mainImage && title && !document.getElementById("getaway-list")) {
        buildList(mainImage, title);
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
