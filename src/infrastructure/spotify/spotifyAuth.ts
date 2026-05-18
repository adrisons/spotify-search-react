export function getHashParams(): Record<string, string> {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce<Record<string, string>>((acc, item) => {
      if (item) {
        const parts = item.split("=");
        if (parts[0] && parts[1]) {
          acc[parts[0]] = decodeURIComponent(parts[1]);
        }
      }
      return acc;
    }, {});
}

export function removeHashParamsFromUrl() {
  window.history.pushState(
    "",
    document.title,
    window.location.pathname + window.location.search
  );
}
