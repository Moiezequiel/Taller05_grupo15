import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import axios from "axios";
import App from "./App";
import { Toaster } from 'sonner'

axios.defaults.baseURL = "https://api.nasa.gov";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster richColors />
  </React.StrictMode>
);
