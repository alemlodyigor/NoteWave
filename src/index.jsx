import React from "react";
import  ReactDOM  from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import "./scss/Main.scss"

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <AuthContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthContextProvider>
)