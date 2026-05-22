import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import History from "./pages/History";
import Home from "./pages/Home";
import ReportDetail from "./pages/ReportDetail";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/history/:reportId" element={<ReportDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
