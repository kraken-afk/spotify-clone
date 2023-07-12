import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { devMode } from "./utils/dev-mode";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "./components/Loader";

const queryClient = new QueryClient();
const root = createRoot(document.getElementById("root") as HTMLElement);

devMode();

root.render(
  import.meta.env.VITE_MODE !== "development" ? (
    <Loader />
  ) : (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  )
);
