export function devMode() {
  if (import.meta.env.MODE !== "development") return;
  const element = document.body;

  alert("The apps is under developmenet");
  element.style.cursor = "not-allowed";
  element.style.pointerEvents = "none";
}