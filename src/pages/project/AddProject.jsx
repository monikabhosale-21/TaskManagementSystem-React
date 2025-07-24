import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, TextField, Button, Typography, Box, MenuItem } from "@mui/material";
import { addProject, updateProject } from "../../api/project";
import { getStatus } from "../../api/status";

const AddProject = ({ onClose, existingProject }) => {
  const [form, setForm] = useState({
    projectId: 0,
    projectName: "",
    reference: "",
    startDate: "",
    deadline: "",
    statusId: 0,
  });
  const [statuses, setStatus] = useState([]);
  // Load project data if editing
  useEffect(() => {
    const fetchData = async () => {
      try {
        const statusRes = await getStatus();
        setStatus(statusRes.data.data || []);

        if (existingProject) {
          const parseDate = (dateStr) => {
            if (!dateStr) return "";
            const date = new Date(dateStr);
            return date.toISOString().split("T")[0]; // YYYY-MM-DD
          };

          setForm({
            projectId: existingProject.projectId || 0,
            projectName: existingProject.projectName || "",
            reference: existingProject.reference || "",
            startDate: parseDate(existingProject.startDate),
            deadline: parseDate(existingProject.deadline),
            statusId: existingProject.statusId || 0,
          });
        }
      } catch (err) {
        console.error("Error loading dropdown data", err);
      }
    };
    fetchData();
  }, [existingProject]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.projectId) {
        await updateProject(form);
        alert("Project updated successfully");
      } else {
        await addProject(form);
        alert("Project added successfully");
      }
      onClose(); // close the form
    } catch (error) {
      alert("Error saving project");
      console.error(error);
    }
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {form.projectId ? "Edit Project" : "Add Project"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="projectName"
            label="Project Name"
            fullWidth
            margin="normal"
            value={form.projectName}
            onChange={handleChange}
            required
          />
          <TextField
            name="reference"
            label="Reference"
            fullWidth
            margin="normal"
            value={form.reference}
            onChange={handleChange}
          />
          <TextField
            select
            name="statusId"
            label="Status"
            fullWidth
            sx={{
              height: "44px", // Height of the input
              "& .MuiInputBase-root": {
                height: "44px", // Adjust height of the actual input box
              },
            }}
            margin="normal"
            value={form.statusId}
            onChange={handleChange}
            required
          >
            {/* <MenuItem value="">-- Select Status --</MenuItem> */}
            {statuses.map((s) => (
              <MenuItem key={s.statusId} value={s.statusId}>
                {s.statusName}
              </MenuItem>
            ))}
          </TextField>
          <Box display="flex" gap={2} mt={2}>
            <TextField
              name="startDate"
              label="Start Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={form.startDate}
              onChange={handleChange}
              required
            />
            <TextField
              name="deadline"
              label="Deadline"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={form.deadline}
              onChange={handleChange}
              required
            />
          </Box>
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
              {form.projectId ? "Update" : "Submit"}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

AddProject.propTypes = {
  onClose: PropTypes.func.isRequired,
  existingProject: PropTypes.object,
};

export default AddProject;
