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
import AddTask from "./AddTask";
import TaskList from "./TaskList";

function TasksPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTaskClick = () => {
    setSelectedTask(null);
    setShowAddForm(true);
  };

  const handleEditTask = (Task) => {
    setSelectedTask(Task);
    setShowAddForm(true);
  };

  const handleFormClose = () => {
    setShowAddForm(false);
    setSelectedTask(null);
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
                  <AddTask onClose={handleFormClose} existingTask={selectedTask} />
                ) : (
                  <TaskList onEdit={handleEditTask} />
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

export default TasksPage;
