import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "@ui/pages/Login/LoginPage";
import { DashboardPage } from "@ui/pages/Dashboard/DashboardPage";
import { NotFoundPage } from "@ui/pages/NotFound/NotFoundPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </BrowserRouter>
  );
}
