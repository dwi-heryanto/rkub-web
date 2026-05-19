export const THEME_STORAGE_KEY = "rkub-tailoring-theme";

export const THEME_BOOTSTRAP_SCRIPT = `
  try {
    const theme = localStorage.getItem("${THEME_STORAGE_KEY}");
    if (theme === "light" || theme === "dark") {
      document.documentElement.dataset.theme = theme;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.dataset.theme = "dark";
    }
  } catch (error) {
    // ignore storage access issues in restricted browsers
  }
`;
