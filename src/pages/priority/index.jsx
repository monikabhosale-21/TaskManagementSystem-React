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
import AddPriority from "./AddPriority";
import PriorityList from "./PriorityList";

function PriorityPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);

  const handleAddPriorityClick = () => {
    setSelectedPriority(null);
    setShowAddForm(true);
  };

  const handleEditPriority = (Priority) => {
    setSelectedPriority(Priority);
    setShowAddForm(true);
  };

  const handleFormClose = () => {
    setShowAddForm(false);
    setSelectedPriority(null);
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
                  <AddPriority onClose={handleFormClose} existingPriority={selectedPriority} />
                ) : (
                  <PriorityList onEdit={handleEditPriority} />
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

export default PriorityPage;
