import ReactDOM from "react-dom/client";
import React from "react";
import { App } from "./App";

// parcel bug workround
if (module.hot) {
  module.hot.accept(() => {
    location.reload();
  });
}
const element = document.getElementById("app");

const root = ReactDOM.createRoot(element);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
