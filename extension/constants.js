/**
 * Constants for the Getaway Direct extension
 */

// API Configuration
const API_CONFIG = {
  BASE_URL: "https://api.getaway.direct",
  ENDPOINTS: {
    SEARCH: "/search",
  },
};

// UI Configuration
const UI_CONFIG = {
  SKELETON_COUNT: 3,
  LOGO_SIZE: 20,
  INFO_ICON_SIZE: 16,
};

// CSS Selectors for Airbnb elements
const AIRBNB_SELECTORS = {
  MAIN_IMAGE: "#FMP-target",
  TITLE_CONTAINER:
    "#site-content > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div > div._16e70jgn > div > div:nth-child(1) > div > div > div > section > div.t1kjrihn.atm_c8_2x1prs.atm_g3_1jbyh58.atm_fr_11a07z3.atm_cs_10d11i2.atm_c8_sz6sci__oggzyc.atm_g3_17zsb9a__oggzyc.atm_fr_kzfbxz__oggzyc.dir.dir-ltr > h2",
  MAIN_LOCATION_CONTAINER:
    "#site-content > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div > div > div > div:nth-child(2) > section > div.s14u3lzn.atm_le_74f3fj.atm_le_8opf4g__oggzyc.atm_le_dm248g__qky54b.dir.dir-ltr > div > h2",
  LOCATION_CONTAINER: "._1t2xqmi",
  RIGHT_SIDE: "._1s21a6e2",
  REFERENCE_NODE: "._mubbvpq",
};

// Element IDs
const ELEMENT_IDS = {
  GETAWAY_LIST: "getaway-list",
  SKELETON_SECTION: "skeleton-section",
};

// External URLs
const EXTERNAL_URLS = {
  SUPPORT: "https://buymeacoffee.com/fliellerjulian",
  TWITTER: "https://x.com/fliellerjulian",
  UNINSTALL_FORM: "https://forms.gle/uL6X8jqbqMAvUr528",
};

// Section titles and descriptions
const SECTIONS = {
  DIRECT_LINKS: {
    title: "Possible Direct Links",
    description: "Direct links to the host's website.",
  },
  OTHER_PORTALS: {
    title: "Other Portals",
    description: "Booking portals like Expedia or Booking.com.",
  },
  SOCIALS: {
    title: "Possible Socials",
    description: "Social media links for direct contact.",
  },
  SUPPORT: {
    title: "Support this Project",
    description:
      "Your support helps keep this tool free and allows me to continue improving it.",
  },
};

// Error messages
const ERROR_MESSAGES = {
  FETCH_ERROR:
    "We're having trouble retrieving the information right now. Please check your internet connection, or try again later. If the issue persists, please contact support.",
  NO_MATCHES: "No matches found",
};

// Brand configuration
const BRAND = {
  NAME: "getaway.direct",
  COLOR: "#4D39FF",
  LOGO_PATH: "assets/logo.png",
  INFO_ICON_PATH: "assets/info.png",
};
