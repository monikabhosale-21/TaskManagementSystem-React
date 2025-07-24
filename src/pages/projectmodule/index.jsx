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
import AddProjectModule from "./AddProjectModule";
import ProjectModuleList from "./ProjectModuleList";

function ProjectModulesPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProjectModule, setSelectedProjectModule] = useState(null);

  const handleAddProjectModuleClick = () => {
    setSelectedProjectModule(null);
    setShowAddForm(true);
  };

  const handleEditProjectModule = (ProjectModule) => {
    setSelectedProjectModule(ProjectModule);
    setShowAddForm(true);
  };

  const handleFormClose = () => {
    setShowAddForm(false);
    setSelectedProjectModule(null);
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
                  <AddProjectModule
                    onClose={handleFormClose}
                    existingProjectModule={selectedProjectModule}
                  />
                ) : (
                  <ProjectModuleList onEdit={handleEditProjectModule} />
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

export default ProjectModulesPage;
