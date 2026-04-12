import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResourceCataloguePage from "../pages/user/ResourceCataloguePage";
import ResourceDetailsPage from "../pages/user/ResourceDetailsPage";
import ManageResourcesPage from "../pages/admin/ManageResourcesPage";
import CreateTicketPage from "../pages/technician/CreateTicketPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ResourceCataloguePage />} />
        <Route path="/resources/:id" element={<ResourceDetailsPage />} />
        <Route path="/admin/resources" element={<ManageResourcesPage />} />
        <Route path="/user/tickets/create" element={<CreateTicketPage />} />
      </Routes>
    </BrowserRouter>
  );
}