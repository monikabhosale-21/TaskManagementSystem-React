import React from "react";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <main style={{ padding: "20px", marginLeft: "240px", width: "100%" }}>{children}</main>
    </div>
  );
};

export default AdminLayout;
