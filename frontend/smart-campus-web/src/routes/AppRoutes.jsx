import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import UnauthorizedPage from "../pages/auth/UnauthorizedPage";
import OAuthSuccess from "../pages/auth/OAuthSuccess";
import ProtectedRoute from "../components/auth/ProtectedRoute";

import ResourceCataloguePage from "../pages/user/ResourceCataloguePage";
import MyBookingsPage from "../pages/user/MyBookingsPage";
import ResourceDetailsPage from "../pages/user/ResourceDetailsPage";
import MyTicketsPage from "../pages/user/MyTicketsPage";
import TicketDetailsPage from "../pages/user/TicketDetailsPage";

import ManageResourcesPage from "../pages/admin/ManageResourcesPage";
import AdminTicketsPage from "../pages/admin/AdminTicketsPage";
import AdminTicketDetailsPage from "../pages/admin/AdminTicketDetailsPage";
import BookingApprovalsPage from "../pages/admin/BookingApprovalsPage";

import CreateTicketPage from "../pages/technician/CreateTicketPage";
import AssignedTicketsPage from "../pages/technician/AssignedTicketsPage";
import TechnicianTicketDetailsPage from "../pages/technician/TechnicianTicketDetailsPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<ResourceCataloguePage />} />
      <Route path="/resources/:id" element={<ResourceDetailsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/oauth-success" element={<OAuthSuccess />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* User routes */}
      <Route path="/user/bookings" element={
        <ProtectedRoute allowedRoles={['USER', 'ADMIN', 'TECHNICIAN']}>
          <MyBookingsPage />
        </ProtectedRoute>
      } />
      <Route path="/user/tickets" element={
        <ProtectedRoute allowedRoles={['USER', 'ADMIN', 'TECHNICIAN']}>
          <MyTicketsPage />
        </ProtectedRoute>
      } />
      <Route path="/user/tickets/:id" element={
        <ProtectedRoute allowedRoles={['USER', 'ADMIN', 'TECHNICIAN']}>
          <TicketDetailsPage />
        </ProtectedRoute>
      } />

      {/* Technician routes */}
      <Route path="/technician/tickets" element={
        <ProtectedRoute allowedRoles={['TECHNICIAN', 'ADMIN']}>
          <AssignedTicketsPage />
        </ProtectedRoute>
      } />
      <Route path="/technician/tickets/:id" element={
        <ProtectedRoute allowedRoles={['TECHNICIAN', 'ADMIN']}>
          <TechnicianTicketDetailsPage />
        </ProtectedRoute>
      } />
      <Route path="/user/tickets/create" element={
        <ProtectedRoute allowedRoles={['USER', 'TECHNICIAN', 'ADMIN']}>
          <CreateTicketPage />
        </ProtectedRoute>
      } />

      {/* Admin routes */}
      <Route path="/admin/resources" element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <ManageResourcesPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/tickets" element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <AdminTicketsPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/tickets/:id" element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <AdminTicketDetailsPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/bookings" element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <BookingApprovalsPage />
        </ProtectedRoute>
      } />
    </Routes>
  );
}