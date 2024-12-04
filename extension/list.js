// Function to build the main list
function buildList(mainImage, title, subtitle, location) {
  if (document.getElementById("getaway-list")) {
    return; // Exit if the list is already present
  }

  const list = document.createElement("div");
  list.id = "getaway-list";
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
  logoIcon.style = "width: 20px; height: 20px; border-radius: 5px;";
  logoContainer.appendChild(logoIcon);
  const logoText = document.createElement("span");
  logoText.textContent = "getaway.direct";
  logoText.style = "font-size: 14px; font-weight: bold; color: #4D39FF;";
  logoContainer.appendChild(logoText);
  list.appendChild(logoContainer);

  // Add skeletons as placeholders
  const skeletonSection = createSkeletonSection();
  list.appendChild(skeletonSection);

  // Insert list with skeletons into the page
  rightSide.insertBefore(list, referenceNode);

  // Send message to background.js to fetch data
  chrome.runtime.sendMessage(
    {
      type: "searchImage",
      imageUrl: mainImage.src,
      name: removeEmojisAndSpecialChars(title),
      subtitle: subtitle,
      location: location,
    },
    (response) => {
      // Remove skeletons and display actual data when the response arrives
      list.removeChild(skeletonSection);

      renderRealSections(list, response);
    }
  );
}

// Function to create skeleton placeholders
function createSkeletonSection() {
  const skeletonSection = document.createElement("div");
  skeletonSection.id = "skeleton-section";
  skeletonSection.style = "margin-bottom: 20px;";

  for (let i = 0; i < 3; i++) {
    const skeleton = document.createElement("div");
    skeleton.className = "skeleton";
    skeleton.style =
      "width: 100%; height: 24px; margin-bottom: 10px; background: #e0e0e0; border-radius: 8px; animation: shimmer 1.5s infinite linear;";
    skeletonSection.appendChild(skeleton);
  }
  return skeletonSection;
}

// Function to add support button
function addSupportButton() {
  const supportContainer = document.createElement("div");
  supportContainer.style = "width: 100%;";

  const supportButton = document.createElement("button");
  supportButton.style =
    "display: flex; justify-content: space-between; align-items: center; width: 100%; background-color: #FFD700; color: #000; border: none; border-radius: 8px; padding: 10px; font-size: 16px; cursor: pointer; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px; transition: background-color 0.3s;";
  supportButton.onmouseover = () =>
    (supportButton.style.backgroundColor = "#FFC300");
  supportButton.onmouseout = () =>
    (supportButton.style.backgroundColor = "#FFD700");
  supportButton.onclick = () =>
    window.open("https://buymeacoffee.com/fliellerjulian", "_blank");

  const buttonText = document.createElement("span");
  buttonText.textContent = "☕ Buy Me a Coffee";
  buttonText.style = "flex: 1; text-align: left;";

  supportButton.appendChild(buttonText);
  supportContainer.appendChild(supportButton);

  return supportContainer;
}

// Function to render real sections with data
function renderRealSections(list, matches) {
  if (!matches["success"]) {
    const errorSection = document.createElement("div");
    errorSection.style = "margin-bottom: 20px;";
    const errorText = document.createElement("p");
    errorText.textContent =
      "We’re having trouble retrieving the information right now. Please check your internet connection, or try again later. If the issue persists, please contact support.";
    errorText.style = "color: #333; font-size: 14px;";
    errorSection.appendChild(errorText);
    list.appendChild(errorSection);
    return;
  }

  let socials = matches["data"]["socials"] || [];
  let direct = matches["data"]["direct"] || [];
  let portals = matches["data"]["portals"] || [];

  // Append categorized sections
  list.appendChild(
    createSection(
      "Possible Direct Links",
      direct,
      "Direct links to the host's website."
    )
  );
  list.appendChild(
    createSection(
      "Other Portals",
      portals,
      "Booking portals like Expedia or Booking.com."
    )
  );
  list.appendChild(
    createSection(
      "Possible Socials",
      socials,
      "Social media links for direct contact."
    )
  );

  list.appendChild(
    createSection(
      "Support this Project",
      socials,
      "Your support helps keep this tool free and allows me to continue improving it."
    )
  );
}

// Helper function to create each section
function createSection(title, items, infoText) {
  const section = document.createElement("div");
  section.style = "margin-bottom: 20px;";

  const sectionHeadingContainer = document.createElement("div");
  sectionHeadingContainer.style =
    "display: flex; gap: 10px; align-items: center;";

  const headingTitle = document.createElement("h3");
  headingTitle.textContent = title;
  headingTitle.style = "margin-bottom: 10px; font-size: 16px;";

  // Info icon with tooltip
  const headingInfoIcon = document.createElement("div");
  headingInfoIcon.className = "tooltip";
  headingInfoIcon.style = "position: relative; display: inline-block;";
  headingInfoIcon.innerHTML = `<img src="${chrome.runtime.getURL(
    "assets/info.png"
  )}" style="width: 16px; height: 16px; margin-bottom: 10px; cursor: pointer;">`;

  const tooltipText = document.createElement("span");
  tooltipText.textContent = infoText;
  tooltipText.className = "tooltiptext";
  headingInfoIcon.appendChild(tooltipText);

  sectionHeadingContainer.appendChild(headingTitle);
  sectionHeadingContainer.appendChild(headingInfoIcon);
  section.appendChild(sectionHeadingContainer);

  if (title === "Support this Project") {
    section.appendChild(addSupportButton());
  } else if (items.length === 0) {
    const placeholder = document.createElement("p");
    placeholder.textContent = "No matches found";
    placeholder.style = "color: #888; font-style: italic;";
    section.appendChild(placeholder);
  } else {
    items.forEach((match, index) => {
      const button = document.createElement("button");
      button.style =
        "display: flex; align-items: center; gap: 10px; padding: 10px; border: none; background-color: #f5f5f5; cursor: pointer; border-radius: 8px; transition: background-color 0.3s; margin-bottom: 10px; width: 100%;";

      const icon = document.createElement("img");
      icon.src = match.source_icon;
      icon.alt = `${match.source} icon`;
      icon.style = "width: 20px; height: 20px;";

      const text = document.createElement("span");
      text.textContent = match.source;

      button.appendChild(icon);
      button.appendChild(text);
      button.onclick = () => window.open(match.link, "_blank");

      section.appendChild(button);
    });
  }

  return section;
}
