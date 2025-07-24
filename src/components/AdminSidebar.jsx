import React from "react";
import { Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, Typography } from "@mui/material";

const AdminSidebar = () => {
  return (
    <Drawer variant="permanent" anchor="left">
      <div style={{ padding: 16 }}>
        <Typography variant="h6">Admin Panel</Typography>
      </div>
      <List>
        <ListItem button component={Link} to="/admin/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/admin/employees">
          <ListItemText primary="Employees" />
        </ListItem>
        <ListItem button component={Link} to="/admin/kyc">
          <ListItemText primary="Employee KYC" />
        </ListItem>
        <ListItem button component={Link} to="/admin/designations">
          <ListItemText primary="Designations" />
        </ListItem>
        <ListItem button component={Link} to="/admin/projects">
          <ListItemText primary="Projects" />
        </ListItem>
        <ListItem button component={Link} to="/admin/modules">
          <ListItemText primary="Project Modules" />
        </ListItem>
        <ListItem button component={Link} to="/admin/tasks">
          <ListItemText primary="Tasks" />
        </ListItem>
        <ListItem button component={Link} to="/admin/task-history">
          <ListItemText primary="Task History" />
        </ListItem>
        <ListItem button component={Link} to="/admin/task-status">
          <ListItemText primary="Task Status" />
        </ListItem>
        <ListItem button component={Link} to="/admin/priority">
          <ListItemText primary="Priority" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
