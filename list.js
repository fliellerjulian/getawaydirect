function buildList(visual_matches) {
  if (document.getElementById("getaway-list")) {
    return; // Exit if the list is already present
  }

  console.log("visual_matches", visual_matches);
  const list = document.createElement("div");
  list.id = "getaway-list";
  list.style =
    "border: 1px solid rgb(221, 221, 221); border-radius: 12px; padding: 24px; box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;";

  const rightSide = document.getElementsByClassName("_1s21a6e2")[0];
  const referenceNode = document.getElementsByClassName("_mubbvpq")[0];

  console.log(rightSide);

  //visual_matches.forEach((match) => {});
  rightSide.insertBefore(list, referenceNode);
}
