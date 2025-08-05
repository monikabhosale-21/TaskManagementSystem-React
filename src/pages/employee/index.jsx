import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import AddEmployee from "./AddEmployee";
import EmployeeList from "./EmployeeList";
import AddEmployeeKyc from "./AddEmployeeKyc";

function EmployeesPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showKycForm, setShowKycForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowAddForm(true);
    setShowKycForm(false);
  };

  const handleFormClose = () => {
    setShowAddForm(false);
    setShowKycForm(false);
    setSelectedEmployee(null);
    setSelectedEmployeeId(null);
  };

  const handleAddKyc = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setShowAddForm(false);
    setShowKycForm(true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                {showAddForm ? (
                  <AddEmployee onClose={handleFormClose} existingEmployee={selectedEmployee} />
                ) : showKycForm ? (
                  <AddEmployeeKyc onClose={handleFormClose} employeeId={selectedEmployeeId} />
                ) : (
                  <EmployeeList onEdit={handleEditEmployee} onAddKyc={handleAddKyc} />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default EmployeesPage;
