import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "normalize.css";
import { AuthContextProvider } from "./context/AuthContext";
import "normalize.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
