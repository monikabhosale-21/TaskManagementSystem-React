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
import AddProject from "./AddProject";
import ProjectList from "./ProjectList";

function ProjectsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleAddProjectClick = () => {
    setSelectedProject(null);
    setShowAddForm(true);
  };

  const handleEditProject = (Project) => {
    setSelectedProject(Project);
    setShowAddForm(true);
  };

  const handleFormClose = () => {
    setShowAddForm(false);
    setSelectedProject(null);
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
                  <AddProject onClose={handleFormClose} existingProject={selectedProject} />
                ) : (
                  <ProjectList onEdit={handleEditProject} />
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

export default ProjectsPage;
