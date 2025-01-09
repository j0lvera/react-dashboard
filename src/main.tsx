import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { EuiProvider } from "@elastic/eui";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EuiProvider>
      <App />
    </EuiProvider>
  </StrictMode>,
);
