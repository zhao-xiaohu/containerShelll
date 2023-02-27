import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import Script from "./Script";
import WebApp from "./WebApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Script /> */}
    <WebApp />
  </React.StrictMode>
);
