import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

// MD Components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Dashboard Layout
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Your components
import AddDesignation from "./AddDesignation";
import DesignationList from "./DesignationList";

function DesignationsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDesignation, setSelectedDesignation] = useState(null);

  const handleAddDesignationClick = () => {
    setSelectedDesignation(null);
    setShowAddForm(true);
  };

  const handleEditDesignation = (Designation) => {
    setSelectedDesignation(Designation);
    setShowAddForm(true);
  };

  const handleFormClose = () => {
    setShowAddForm(false);
    setSelectedDesignation(null);
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
                  <AddDesignation
                    onClose={handleFormClose}
                    existingDesignation={selectedDesignation}
                  />
                ) : (
                  <DesignationList onEdit={handleEditDesignation} />
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

export default DesignationsPage;
