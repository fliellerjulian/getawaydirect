function buildPaymentButton() {
  if (document.getElementById("getaway-payment")) {
    return; // Exit if the paymebt button is already present
  }

  const extpay = ExtPay("getawaydirect");

  const list = document.createElement("div");
  list.id = "getaway-payment";
  list.style =
    "border: 2px solid #4D39FF; border-radius: 12px; padding: 24px; box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px; margin-top: 24px;";

  const rightSide = document.getElementsByClassName("_1s21a6e2")[0];
  const referenceNode = document.getElementsByClassName("_mubbvpq")[0];

  // Logo and Title
  const logoContainer = document.createElement("div");
  logoContainer.style =
    "display: flex; align-items: center; margin-bottom: 20px; gap: 10px;";
  const logoIcon = document.createElement("img");
  logoIcon.src = chrome.runtime.getURL("assets/logo.png");
  logoIcon.style = "width: 20px; height: 20px;border-radius: 5px;";
  logoContainer.appendChild(logoIcon);
  const logoText = document.createElement("span");
  logoText.textContent = "getaway.direct";
  logoText.style = "font-size: 14px; font-weight: bold;color: #4D39FF;";
  logoContainer.appendChild(logoText);
  list.appendChild(logoContainer);

  //description
  const errorSection = document.createElement("div");
  errorSection.style = "margin-bottom: 20px;";
  const errorText = document.createElement("p");
  errorText.innerHTML =
    "Out of Free Searches? Upgrade to <b>save an average of $35 per night</b> with direct bookings.";

  errorText.style = "color: #333; font-size:14px;";
  errorSection.appendChild(errorText);
  list.appendChild(errorSection);

  //payment button
  const paymentButton = document.createElement("button");
  paymentButton.id = "payment-button";
  paymentButton.textContent = "Get Access";
  paymentButton.style =
    "background-color: #4D39FF; color: white; padding: 10px 20px; border-radius: 5px; font-weight: bold; cursor: pointer; border: none;transition: background-color 0.3s;";
  paymentButton.onmouseover = () =>
    (paymentButton.style.backgroundColor = "#3C2BCC");
  paymentButton.onmouseout = () =>
    (paymentButton.style.backgroundColor = "#4D39FF");
  paymentButton.onclick = () => {
    // Open payment page
    extpay.openPaymentPage(
      "Save an average of $35 per night! Connect directly with property hosts for your next stay."
    );
  };

  list.appendChild(paymentButton);

  // Insert list with skeletons into the page
  rightSide.insertBefore(list, referenceNode);
}
