var theme = localStorage.getItem("theme");
if (theme === "light") {
  document.documentElement.classList.add("light");
} else if (!theme && window.matchMedia("(prefers-color-scheme:light)").matches) {
  document.documentElement.classList.add("light");
}
