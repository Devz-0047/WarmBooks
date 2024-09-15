import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BookProvider } from "./BookProvider";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BookProvider>
      <App />
    </BookProvider>
  </React.StrictMode>
);
