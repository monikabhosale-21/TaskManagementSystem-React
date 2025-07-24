import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import EmployeeSidebar from "../components/EmployeeSidebar";

const MainLayout = ({ children }) => {
  const role = localStorage.getItem("role");

  const renderSidebar = () => {
    if (role === "admin") return <AdminSidebar />;
    if (role === "employee") return <EmployeeSidebar />;
    return null;
  };

  return (
    <div style={{ display: "flex" }}>
      {renderSidebar()}
      <main style={{ padding: "20px", marginLeft: "240px", width: "100%" }}>{children}</main>
    </div>
  );
};

export default MainLayout;
