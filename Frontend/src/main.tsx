import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  AuthProvider
} from "@/context/auth-context";
import { ThemeProvider } from "@/context/theme-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider
        defaultTheme="dark"
        storageKey="vite-ui-theme"
      >
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);