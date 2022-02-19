import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/login/LoginPage";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
