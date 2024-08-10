import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppWrapper from "./App"; // Import AppWrapper
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
