(function () {
  var KEY = "aaacat-theme";

  function getTheme() {
    try {
      var stored = localStorage.getItem(KEY);
      if (stored === "light" || stored === "dark") return stored;
    } catch (e) {}
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    var root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.style.colorScheme = theme;
    window.dispatchEvent(
      new CustomEvent("aaacat-theme-change", { detail: { theme: theme } })
    );
  }

  applyTheme(getTheme());

  window.toggleAaacatTheme = function () {
    var next = getTheme() === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(KEY, next);
    } catch (e) {}
    applyTheme(next);
    return next;
  };

  window.getAaacatTheme = getTheme;
})();
