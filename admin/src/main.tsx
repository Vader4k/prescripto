import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AdminProvider } from "./context/AdminContext";
import { DoctorProvider } from "./context/DoctorContext";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AdminProvider>
        <DoctorProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </DoctorProvider>
      </AdminProvider>
    </BrowserRouter>
  </StrictMode>
);
