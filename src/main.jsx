import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<App />} />
        <Route path="/experience" element={<App />} />
        <Route path="/education" element={<App />} />
        <Route path="/projects" element={<App />} />
        <Route path="/contact" element={<App />} />
        <Route path="/404" element={<App />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
