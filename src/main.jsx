// src/main.jsx
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { FavoritesProvider } from "./context/FavoritesContext";
import { TeamProvider } from "./context/TeamContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FavoritesProvider>
      <TeamProvider>
        <App />
      </TeamProvider>
    </FavoritesProvider>
  </BrowserRouter>
);
