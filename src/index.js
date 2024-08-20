import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppWrapper from "./App"; // Import AppWrapper
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/store";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWrapper />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
