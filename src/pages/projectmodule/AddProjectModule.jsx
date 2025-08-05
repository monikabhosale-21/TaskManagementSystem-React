import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, TextField, Button, Typography, Box, MenuItem } from "@mui/material";
import { addProjectModule, updateProjectModule } from "../../api/ProjectModule";
import { getProjects } from "../../api/project";
import { getStatus } from "../../api/status";

const AddProjectModule = ({ onClose, existingProjectModule }) => {
  const [form, setForm] = useState({
    moduleId: 0,
    projectId: "",
    moduleName: "",
    statusId: "",
  });

  const [projects, setProjects] = useState([]);
  const [statuses, setStatus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projRes = await getProjects();
        const statusRes = await getStatus();
        setProjects(projRes.data.data || []);
        setStatus(statusRes.data.data || []);

        if (existingProjectModule) {
          setForm({
            moduleId: existingProjectModule.moduleId || 0,
            projectId: existingProjectModule.projectId || 0,
            moduleName: existingProjectModule.moduleName || "",
            statusId: existingProjectModule.statusId || 0,
          });
        }
      } catch (err) {
        console.error("Error loading dropdown data", err);
      }
    };

    fetchData();
  }, [existingProjectModule]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.moduleId) {
        await updateProjectModule(form);
        alert("Project Module updated successfully");
      } else {
        await addProjectModule(form);
        alert("Project Module added successfully");
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
          {form.moduleId ? "Edit Project Module" : "Add Project Module"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Project"
            name="projectId"
            value={form.projectId}
            onChange={handleChange}
            margin="dense"
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
          <TextField
            name="moduleName"
            label="Module Name"
            fullWidth
            margin="dense"
            value={form.moduleName}
            onChange={handleChange}
            required
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
            margin="dense"
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
              {form.moduleId ? "Update" : "Submit"}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

AddProjectModule.propTypes = {
  onClose: PropTypes.func.isRequired,
  existingProjectModule: PropTypes.object,
};

export default AddProjectModule;
