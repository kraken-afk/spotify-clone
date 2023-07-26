import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Loader from "./components/popups/Loader";

const queryClient = new QueryClient();
const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  import.meta.env.VITE_MODE !== "development" ? (
    <Loader title="under construction" />
  ) : (
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  )
);
