/**
 * Builds the main list element and inserts it into the Airbnb page
 */

/**
 * Builds the main list element and inserts it into the Airbnb page
 * @param {HTMLElement} mainImage - The main property image element
 * @param {string} title - The property title
 * @param {string} subtitle - The property subtitle (unused)
 * @param {string} location - The property location
 */
function buildList(mainImage, title, subtitle, location) {
  if (document.getElementById(ELEMENT_IDS.GETAWAY_LIST)) {
    return;
  }

  const list = document.createElement("div");
  list.id = ELEMENT_IDS.GETAWAY_LIST;
  list.className = "getaway-list";

  const rightSide = document.getElementsByClassName(
    AIRBNB_SELECTORS.RIGHT_SIDE.replace(".", "")
  )[0];
  const referenceNode = document.getElementsByClassName(
    AIRBNB_SELECTORS.REFERENCE_NODE.replace(".", "")
  )[0];

  // Logo and Title
  const logoContainer = document.createElement("div");
  logoContainer.className = "logo-container";
  const logoIcon = document.createElement("img");
  logoIcon.src = chrome.runtime.getURL(BRAND.LOGO_PATH);
  logoIcon.className = "logo-icon";
  logoContainer.appendChild(logoIcon);
  const logoText = document.createElement("span");
  logoText.textContent = BRAND.NAME;
  logoText.className = "logo-text";
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

/**
 * Creates skeleton loading placeholders
 * @returns {HTMLElement} - The skeleton section element
 */
function createSkeletonSection() {
  const skeletonSection = document.createElement("div");
  skeletonSection.id = ELEMENT_IDS.SKELETON_SECTION;
  skeletonSection.className = "skeleton-section";

  for (let i = 0; i < UI_CONFIG.SKELETON_COUNT; i++) {
    const skeleton = document.createElement("div");
    skeleton.className = "skeleton skeleton-item";
    skeletonSection.appendChild(skeleton);
  }
  return skeletonSection;
}

/**
 * Creates a support button for donations
 * @returns {HTMLElement} - The support container element
 */
function addSupportButton() {
  const supportContainer = document.createElement("div");
  supportContainer.className = "support-container";

  const supportButton = document.createElement("button");
  supportButton.className = "support-button";
  supportButton.onclick = () => window.open(EXTERNAL_URLS.SUPPORT, "_blank");

  const buttonText = document.createElement("span");
  buttonText.textContent = "☕ Buy Me a Coffee";
  buttonText.className = "support-button-text";

  supportButton.appendChild(buttonText);
  supportContainer.appendChild(supportButton);

  return supportContainer;
}

/**
 * Renders the actual sections with data from the API
 * @param {HTMLElement} list - The main list container
 * @param {Object} matches - The API response containing match data
 */
function renderRealSections(list, matches) {
  if (!matches["success"]) {
    const errorSection = document.createElement("div");
    errorSection.className = "error-section";
    const errorText = document.createElement("p");
    errorText.textContent = ERROR_MESSAGES.FETCH_ERROR;
    errorText.className = "error-text";
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

/**
 * Creates a section with title, items, and info tooltip
 * @param {string} title - The section title
 * @param {Array} items - Array of items to display in the section
 * @param {string} infoText - Tooltip text for the info icon
 * @returns {HTMLElement} - The section element
 */
function createSection(title, items, infoText) {
  const section = document.createElement("div");
  section.className = "section";

  const sectionHeadingContainer = document.createElement("div");
  sectionHeadingContainer.className = "section-heading-container";

  const headingTitle = document.createElement("h3");
  headingTitle.textContent = title;
  headingTitle.className = "section-title";

  // Info icon with tooltip
  const headingInfoIcon = document.createElement("div");
  headingInfoIcon.className = "tooltip info-icon";
  const infoImg = document.createElement("img");
  infoImg.src = chrome.runtime.getURL(BRAND.INFO_ICON_PATH);
  headingInfoIcon.appendChild(infoImg);

  const tooltipText = document.createElement("span");
  tooltipText.textContent = infoText;
  tooltipText.className = "tooltiptext";
  headingInfoIcon.appendChild(tooltipText);

  sectionHeadingContainer.appendChild(headingTitle);
  sectionHeadingContainer.appendChild(headingInfoIcon);
  section.appendChild(sectionHeadingContainer);

  if (title === SECTIONS.SUPPORT.title) {
    section.appendChild(addSupportButton());
  } else if (items.length === 0) {
    const placeholder = document.createElement("p");
    placeholder.textContent = ERROR_MESSAGES.NO_MATCHES;
    placeholder.className = "placeholder-text";
    section.appendChild(placeholder);
  } else {
    items.forEach((match, _index) => {
      const button = document.createElement("button");
      button.className = "match-button";

      const icon = document.createElement("img");
      icon.src = match.source_icon;
      icon.alt = `${match.source} icon`;
      icon.className = "match-icon";

      const text = document.createElement("span");
      text.textContent = match.source;
      text.className = "match-text";

      button.appendChild(icon);
      button.appendChild(text);
      button.onclick = () => window.open(match.link, "_blank");

      section.appendChild(button);
    });
  }

  return section;
}
