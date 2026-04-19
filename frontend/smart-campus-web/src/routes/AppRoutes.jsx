import React from "react";
import { Routes, Route } from "react-router-dom";
import ResourceCataloguePage from "../pages/user/ResourceCataloguePage";
import ResourceDetailsPage from "../pages/user/ResourceDetailsPage";
import ManageResourcesPage from "../pages/admin/ManageResourcesPage";
import CreateTicketPage from "../pages/technician/CreateTicketPage";
import MyTicketsPage from "../pages/user/MyTicketsPage";
import TicketDetailsPage from "../pages/user/TicketDetailsPage";
import AdminTicketsPage from "../pages/admin/AdminTicketsPage";
import AdminTicketDetailsPage from "../pages/admin/AdminTicketDetailsPage";
import AssignedTicketsPage from "../pages/technician/AssignedTicketsPage";
import TechnicianTicketDetailsPage from "../pages/technician/TechnicianTicketDetailsPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Resource routes */}
      <Route path="/" element={<ResourceCataloguePage />} />
      <Route path="/resources/:id" element={<ResourceDetailsPage />} />
      <Route path="/admin/resources" element={<ManageResourcesPage />} />

      {/* Ticket routes */}
      <Route path="/user/tickets/create" element={<CreateTicketPage />} />
      <Route path="/user/tickets" element={<MyTicketsPage />} />
      <Route path="/user/tickets/:id" element={<TicketDetailsPage />} />
      <Route path="/admin/tickets" element={<AdminTicketsPage />} />
      <Route path="/admin/tickets/:id" element={<AdminTicketDetailsPage />} />
      <Route path="/technician/tickets" element={<AssignedTicketsPage />} />
      <Route path="/technician/tickets/:id" element={<TechnicianTicketDetailsPage />} />
    </Routes>
  );
}