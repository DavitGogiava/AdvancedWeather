import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MobileProvider } from "./Utils/DeviceContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MobileProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MobileProvider>
  </React.StrictMode>
);
