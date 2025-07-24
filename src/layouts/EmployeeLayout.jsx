import React from "react";
import EmployeeSidebar from "../components/EmployeeSidebar";

const EmployeeLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <EmployeeSidebar />
      <main style={{ padding: "20px", marginLeft: "240px", width: "100%" }}>{children}</main>
    </div>
  );
};

export default EmployeeLayout;
