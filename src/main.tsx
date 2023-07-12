import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { devMode } from "./utils/dev-mode";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const root = createRoot(
  document.getElementById("root") as HTMLElement
);

devMode();

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
