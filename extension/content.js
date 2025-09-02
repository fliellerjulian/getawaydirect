/**
 * Content script for Getaway Direct extension
 * Monitors Airbnb pages for property listings and injects the extension UI
 */
/**
 * Initializes the extension when the page loads
 * Sets up a MutationObserver to watch for DOM changes
 */
window.addEventListener("load", function () {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((_mutation) => {
      const mainImage = document.getElementById(
        AIRBNB_SELECTORS.MAIN_IMAGE.replace("#", "")
      );
      const titleContainer = document.querySelector(
        AIRBNB_SELECTORS.TITLE_CONTAINER
      );
      const title = titleContainer ? titleContainer.textContent : null;
      const mainLocationContainer = document.querySelector(
        AIRBNB_SELECTORS.MAIN_LOCATION_CONTAINER
      );
      const locationContainer = document.getElementsByClassName(
        AIRBNB_SELECTORS.LOCATION_CONTAINER.replace(".", "")
      )[0];
      let location = null;
      if (locationContainer) {
        // Create a clone of the element to avoid triggering events on the actual DOM
        const clonedContainer = locationContainer.cloneNode(true);
        const locationText = clonedContainer.querySelector("h3")
          ? clonedContainer.querySelector("h3").textContent
          : null;

        location = locationText ? locationText.split(",")[0] : null;
      }
      if (
        mainImage &&
        title &&
        mainLocationContainer &&
        !document.getElementById(ELEMENT_IDS.GETAWAY_LIST)
      ) {
        buildList(mainImage, title, "", location);
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
