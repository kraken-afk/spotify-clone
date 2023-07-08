import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { devMode } from "./utils/dev-mode";

const root = createRoot(
  document.getElementById("root") as HTMLElement
);

devMode();

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
