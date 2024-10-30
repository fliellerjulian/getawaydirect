window.addEventListener("load", function () {
  const extpay = ExtPay("getawaydirect");
  extpay.getUser().then((user) => {
    if (!user.paid) {
      extpay.openPaymentPage(
        "Save an average of $35 per night! Skip the middleman and connect directly with property hosts for your next stay."
      );
    }
  });
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
        (!document.getElementById("getaway-list") ||
          !document.getElementById("getaway-payment"))
      ) {
        extpay.getUser().then((user) => {
          if (user.paid) {
            buildList(mainImage, title, subtitle);
          } else {
            buildPaymentButton();
          }
        });
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
