function removeEmojisAndSpecialChars(text) {
  return text.replace(
    /[\u{1F600}-\u{1F6FF}\u{1F300}-\u{1F5FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{1FB00}-\u{1FBFF}\u2600-\u26FF\u2700-\u27BF]/gu,
    ""
  );
}
