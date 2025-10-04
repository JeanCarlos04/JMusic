import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { MainContextProvider } from "./Contexts/MainContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MainContextProvider>
  </StrictMode>
);
