export const themeStorageKey = "portfolio-theme";

// Apply a saved choice before the page paints. Light remains the default.
export const themeInitScript = `(function(){var theme="light";try{var saved=localStorage.getItem("${themeStorageKey}");if(saved==="dark"||saved==="light")theme=saved;}catch(e){}document.documentElement.dataset.theme=theme;})();`;
