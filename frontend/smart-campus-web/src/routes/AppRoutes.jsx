import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResourceCataloguePage from "../pages/user/ResourceCataloguePage";
import ResourceDetailsPage from "../pages/user/ResourceDetailsPage";
import ManageResourcesPage from "../pages/admin/ManageResourcesPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ResourceCataloguePage />} />
        <Route path="/resources/:id" element={<ResourceDetailsPage />} />
        <Route path="/admin/resources" element={<ManageResourcesPage />} />
      </Routes>
    </BrowserRouter>
  );
}