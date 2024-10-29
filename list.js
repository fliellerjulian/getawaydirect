function buildList(visual_matches) {
  if (document.getElementById("getaway-list")) {
    return; // Exit if the list is already present
  }

  console.log("visual_matches", visual_matches);
  const list = document.createElement("div");
  list.id = "getaway-list";
  list.style =
    "border: 2px solid #4D39FF; border-radius: 12px; padding: 24px; box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px; margin-top: 24px;";

  const rightSide = document.getElementsByClassName("_1s21a6e2")[0];
  const referenceNode = document.getElementsByClassName("_mubbvpq")[0];

  let socials = [];
  let direct = [];
  let portals = [];

  // Logo and Title
  const logo = document.createElement("div");
  logo.style =
    "display: flex; align-items: center; margin-bottom: 20px; gap: 10px;";
  const logoIcon = document.createElement("img");
  logoIcon.src = chrome.runtime.getURL("assets/logo.png");
  logoIcon.style = "width: 20px; height: 20px;border-radius: 5px;";
  logo.appendChild(logoIcon);
  const logoText = document.createElement("span");
  logoText.textContent = "getaway.direct";
  logoText.style = "font-size: 14px; font-weight: bold;color: #4D39FF;";
  logo.appendChild(logoText);
  list.appendChild(logo);

  // Categorize visual_matches
  // Categorize visual_matches
  let hasInstagram = false;
  let hasFacebook = false;

  visual_matches["data"].forEach((match) => {
    if (match.source === "Instagram") {
      if (!hasInstagram) {
        socials.push(match);
        hasInstagram = true; // Mark Instagram as added
      }
    } else if (match.source === "Facebook") {
      if (!hasFacebook) {
        socials.push(match);
        hasFacebook = true; // Mark Facebook as added
      }
    } else if (["Expedia", "Booking.com"].includes(match.source)) {
      portals.push(match); // Add to portals if source is Expedia or Booking.com
    } else {
      direct.push(match); // Add remaining sources to direct
    }
  });

  // Create Section
  function createSection(title, items) {
    const section = document.createElement("div");
    section.style = "margin-bottom: 20px;";

    const sectionTitle = document.createElement("h3");
    sectionTitle.textContent = title;
    sectionTitle.style = "margin-bottom: 10px; font-size: 16px;";
    section.appendChild(sectionTitle);

    if (items.length === 0) {
      const placeholder = document.createElement("p");
      placeholder.textContent = "No matches found";
      placeholder.style = "color: #888; font-style: italic;";
      section.appendChild(placeholder);
    } else {
      items.forEach((match) => {
        const button = document.createElement("button");
        button.style =
          "display: flex; align-items: center; gap: 10px; padding: 10px; border: none; background-color: #f5f5f5; cursor: pointer; border-radius: 8px; transition: background-color 0.3s; margin-bottom: 10px; width: 100%;";
        button.onmouseover = () => (button.style.backgroundColor = "#e0e0e0");
        button.onmouseout = () => (button.style.backgroundColor = "#f5f5f5");

        const icon = document.createElement("img");
        icon.src = match.source_icon;
        icon.alt = `${match.source} icon`;
        icon.style = "width: 20px; height: 20px;";

        const text = document.createElement("span");
        text.textContent = match.source;

        button.appendChild(icon);
        button.appendChild(text);

        // Set the button to open the link in a new tab
        button.onclick = () => {
          window.open(match.link, "_blank");
        };

        section.appendChild(button);
      });
    }

    return section;
  }

  // Add sections to the list
  list.appendChild(createSection("Possible Direct Links", direct));
  list.appendChild(createSection("Other Portals", portals));
  list.appendChild(createSection("Possible Socials", socials));

  // Insert the list into the page
  rightSide.insertBefore(list, referenceNode);
}
