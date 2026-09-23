import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { CartProvider } from "./cart/cartStore";
import { ThemeProvider } from "./theme/ThemeContext";
import { AuthProvider } from "./auth/AuthProvider";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);