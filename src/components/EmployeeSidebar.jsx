import React from "react";
import { Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, Typography } from "@mui/material";

const EmployeeSidebar = () => {
  return (
    <Drawer variant="permanent" anchor="left">
      <div style={{ padding: 16 }}>
        <Typography variant="h6">Employee Panel</Typography>
      </div>
      <List>
        <ListItem button component={Link} to="/employee/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/employee/assigned-tasks">
          <ListItemText primary="Assigned Tasks" />
        </ListItem>
        <ListItem button component={Link} to="/employee/task-history">
          <ListItemText primary="Task History" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default EmployeeSidebar;
