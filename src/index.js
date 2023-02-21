import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import MC from "@mindverse/container";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <MC />
  </React.StrictMode>
);
