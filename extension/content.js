window.addEventListener("load", function () {
  const extpay = ExtPay("getawaydirect-onetime");

  const observer = new MutationObserver((mutations) => {
    chrome.storage.local.get(["searchCount"], function (result) {
      mutations.forEach((mutation) => {
        //get needed data for
        const mainImage = document.getElementById("FMP-target");
        const titleContainer = document.querySelector(
          "#site-content > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div > div > div > div > section > div > div._t0tx82 > div > h1"
        );
        title = titleContainer ? titleContainer.textContent : null;

        const subtitleContainer = document.querySelector(
          "#site-content > div > div:nth-child(1) > div:nth-child(3) > div > div._16e70jgn > div > div:nth-child(1) > div > div > div > section > div.toieuka.atm_c8_2x1prs.atm_g3_1jbyh58.atm_fr_11a07z3.atm_cs_10d11i2.atm_c8_sz6sci__oggzyc.atm_g3_17zsb9a__oggzyc.atm_fr_kzfbxz__oggzyc.dir.dir-ltr > h2"
        );
        subtitle = subtitleContainer ? subtitleContainer.textContent : null;

        //Find this, to see if location laoded!
        const MainLocationContainer = document.querySelector(
          "#site-content > div > div:nth-child(1) > div:nth-child(5) > div > div > div > div:nth-child(2) > section > div.sewcpu6.atm_le_74f3fj.atm_le_8opf4g__oggzyc.atm_le_dm248g__qky54b.dir.dir-ltr > div > h2"
        );

        // Get actual location -> First, select the container safely
        const locationContainer =
          document.getElementsByClassName("_1t2xqmi")[0];
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
          subtitle &&
          MainLocationContainer &&
          !document.getElementById("getaway-list")
        ) {
          extpay.getUser().then((user) => {
            const isTrial = !result.searchCount || result.searchCount < 5;
            buildList(user.paid, isTrial, mainImage, title, subtitle, location);
          });
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
