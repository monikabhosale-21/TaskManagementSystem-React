import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLogin from "../pages/Admin/Login";
import EmployeeLogin from "../pages/Employee/Login";
import AdminDashboard from "../pages/Admin/Dashboard";
import EmployeeDashboard from "../pages/Employee/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Login Routes */}
      <Route path="/" element={<AdminLogin />} />
      <Route path="/employee/login" element={<EmployeeLogin />} />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <MainLayout>
              <AdminDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Employee Routes */}
      <Route
        path="/employee/dashboard"
        element={
          <ProtectedRoute allowedRoles={["employee"]}>
            <MainLayout>
              <EmployeeDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* TODO: Add other module routes here (EmployeeList, AddKYC, etc.) */}
    </Routes>
  );
};

export default AppRoutes;
