import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
  Card,
  Box,
  CardContent,
} from "@mui/material";
import { addTask, updateTask, getModulesByProject } from "../../api/Task"; // Adjust path accordingly
import { getProjects } from "../../api/project";
import { getEmployees } from "../../api/employee";
import { getTasks } from "../../api/Task";
import { getStatus } from "../../api/status";
import { getPrioritys } from "../../api/Priority";

const AddTask = ({ onClose, existingTask }) => {
  const [form, setForm] = useState({
    id: 0,
    projectId: "",
    moduleId: "",
    taskLabel: "",
    taskDescription: "",
    priorityId: "",
    assignedEmployeeId: "",
    statusId: "",
  });

  const [projects, setProjects] = useState([]);
  const [modules, setModules] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projRes = await getProjects();
        const empRes = await getEmployees();
        const statusRes = await getStatus();
        const prioRes = await getPrioritys();

        setProjects(projRes.data.data || []);
        setEmployees(empRes.data.data || []);
        setStatuses(statusRes.data.data || []);
        setPriorities(prioRes.data.data || []);

        if (existingTask) {
          const modulRes = await getModulesByProject(existingTask.projectId);
          setModules(modulRes.data?.data || []);

          setForm({
            id: existingTask.taskId || 0,
            projectId: existingTask.projectId || 0,
            moduleId: existingTask.moduleId || 0,
            taskLabel: existingTask.taskLabel || "",
            taskDescription: existingTask.taskDescription || "",
            priorityId: existingTask.priorityId || 0,
            assignedEmployeeId: existingTask.assignedEmployeeId || 0,
            statusId: existingTask.statusId || 0,
          });
        }
      } catch (err) {
        console.error("Error loading dropdown data", err);
      }
    };

    fetchData();
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "projectId") {
      try {
        const res = await getModulesByProject(value);
        setModules(res.data?.data || []); // Assuming API returns an array of { id, name }
        setForm((prev) => ({
          ...prev,
          moduleId: "", // reset moduleId if project changed
        }));
      } catch (err) {
        console.error("Failed to load tasks for selected project", err);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await updateTask(form);
        alert("Task updated successfully");
      } else {
        await addTask(form);
        alert("Task added successfully");
      }
      onClose();
    } catch (error) {
      console.error("Error saving Project Module", error);
      alert("Error saving Project Module");
    }
  };
  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {form.id ? "Edit Task Assign" : "Add Task Assign"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                select
                label="Project"
                name="projectId"
                value={form.projectId}
                onChange={handleChange}
                fullWidth
                sx={{
                  height: "44px", // Height of the input
                  "& .MuiInputBase-root": {
                    height: "44px", // Adjust height of the actual input box
                  },
                }}
              >
                {projects.map((p) => (
                  <MenuItem key={p.projectId} value={p.projectId}>
                    {p.projectName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                select
                label="Module"
                name="moduleId"
                value={form.moduleId}
                onChange={handleChange}
                fullWidth
                sx={{
                  height: "44px", // Height of the input
                  "& .MuiInputBase-root": {
                    height: "44px", // Adjust height of the actual input box
                  },
                }}
              >
                {modules.map((m) => (
                  <MenuItem key={m.id} value={m.id}>
                    {m.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Task Label"
                name="taskLabel"
                value={form.taskLabel}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Task Description"
                name="taskDescription"
                value={form.taskDescription}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                select
                fullWidth
                sx={{
                  height: "44px", // Height of the input
                  "& .MuiInputBase-root": {
                    height: "44px", // Adjust height of the actual input box
                  },
                }}
                label="Priority"
                name="priorityId"
                value={form.priorityId}
                onChange={handleChange}
              >
                {priorities.map((p) => (
                  <MenuItem key={p.priorityId} value={p.priorityId}>
                    {p.priorityName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={4}>
              <TextField
                select
                fullWidth
                sx={{
                  height: "44px", // Height of the input
                  "& .MuiInputBase-root": {
                    height: "44px", // Adjust height of the actual input box
                  },
                }}
                label="Assign To"
                name="assignedEmployeeId"
                value={form.assignedEmployeeId}
                onChange={handleChange}
              >
                {employees.map((e) => (
                  <MenuItem key={e.id} value={e.id}>
                    {e.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                fullWidth
                sx={{
                  height: "44px", // Height of the input
                  "& .MuiInputBase-root": {
                    height: "44px", // Adjust height of the actual input box
                  },
                }}
                label="Status"
                name="statusId"
                value={form.statusId}
                onChange={handleChange}
              >
                {statuses.map((s) => (
                  <MenuItem key={s.statusId} value={s.statusId}>
                    {s.statusName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={onClose}
              sx={{
                height: "40px",
                borderRadius: "8px",
                fontWeight: "bold",
                textTransform: "none",
                color: "#fff",
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                height: "40px",
                borderRadius: "8px",
                fontWeight: "bold",
                textTransform: "none",
                color: "#fff",
              }}
            >
              {form.id ? "Update" : "Submit"}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};
AddTask.propTypes = {
  onClose: PropTypes.func.isRequired,
  existingTask: PropTypes.object,
};
export default AddTask;
