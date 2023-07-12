export function devMode() {
  if (import.meta.env.VITE_MODE === "development") return;
  const element = document.body;

  alert("The apps is under developmenet");
  element.style.cursor = "not-allowed";
  element.style.pointerEvents = "none";
}