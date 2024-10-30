window.addEventListener("load", function () {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const mainImage = document.getElementById("FMP-target");
      const titleContainer = document.getElementsByClassName("_1czgyoo")[0];
      title = titleContainer
        ? titleContainer.querySelector("h1").textContent
        : null;

      const subtitle =
        "Gesamte Unterkunft: Privatunterkunft in Kecamatan Kuta Selatan, Indonesien";

      if (
        mainImage &&
        title &&
        subtitle &&
        !document.getElementById("getaway-list")
      ) {
        buildList(mainImage, title, subtitle);
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
