import React from "react";
import { Routes, Route } from "react-router-dom";
import ResourceCataloguePage from "../pages/user/ResourceCataloguePage";
import ResourceDetailsPage from "../pages/user/ResourceDetailsPage";
import ManageResourcesPage from "../pages/admin/ManageResourcesPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ResourceCataloguePage />} />
      <Route path="/resources/:id" element={<ResourceDetailsPage />} />
      <Route path="/admin/resources" element={<ManageResourcesPage />} />
    </Routes>
  );
}