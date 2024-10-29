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

  // Iterate through the first 10 items in visual_matches
  visual_matches["data"].forEach((match) => {
    const button = document.createElement("button");
    button.style =
      "display: flex; align-items: center; gap: 10px; padding: 10px; border: none; background-color: #f5f5f5; cursor: pointer; border-radius: 8px; transition: background-color 0.3s;margin-bottom:10px;";
    button.onmouseover = () => (button.style.backgroundColor = "#e0e0e0");
    button.onmouseout = () => (button.style.backgroundColor = "#f5f5f5");

    const icon = document.createElement("img");
    icon.src = match.source_icon;
    icon.alt = `${match.source} icon`;
    icon.style = "width: 20px; height: 20px; border-radius: 50%;";

    const text = document.createElement("span");
    text.textContent = match.source;

    button.appendChild(icon);
    button.appendChild(text);

    // Set the button to open the link in a new tab
    button.onclick = () => {
      window.open(match.link, "_blank");
    };

    list.appendChild(button);
  });

  rightSide.insertBefore(list, referenceNode);
}
