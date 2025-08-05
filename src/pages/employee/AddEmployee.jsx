import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Grid,
} from "@mui/material";
import { addEmployee, generateEmployeeCode, updateEmployee } from "../../api/employee";
import { getDesignations } from "../../api/designation";

const AddEmployee = ({ onClose, existingEmployee }) => {
  const [form, setForm] = useState({
    id: 0,
    name: "",
    code: "",
    email: "",
    passwordHash: "",
    role: "Employee",
    createdby: localStorage.getItem("id"),
    updatedby: localStorage.getItem("id"),
  });

  const [roles, setroles] = useState([]);

  useEffect(() => {
    const initForm = async () => {
      const roleRes = await getDesignations();
      setroles(roleRes.data.data || []);

      if (existingEmployee) {
        // Edit mode
        setForm(existingEmployee);
      } else {
        // New mode — get next employee code from API
        try {
          const response = await generateEmployeeCode();
          const newCode = typeof response.data === "string" ? response.data : response.data.empCode;

          setForm((prev) => ({
            ...prev,
            code: newCode,
          }));
        } catch (error) {
          console.error("Failed to generate employee code", error);
        }
      }
    };

    initForm();
  }, [existingEmployee]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await updateEmployee(form);
        alert("Employee updated successfully");
      } else {
        await addEmployee(form);
        alert("Employee added successfully");
      }

      setForm({
        id: 0,
        name: "",
        code: "",
        email: "",
        passwordHash: "",
        role: "Employee",
        createdby: localStorage.getItem("id"),
        updatedby: localStorage.getItem("id"),
      });

      onClose();
    } catch (error) {
      alert("Error saving employee");
      console.error(error);
    }
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {form.id ? "Edit Employee" : "Add Employee"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="code"
                label="Code"
                fullWidth
                margin="normal"
                value={form.code}
                onChange={handleChange}
                required
                InputProps={{
                  readOnly: !form.id, // 👉 read-only only when adding
                }}
              />
            </Grid>
            <TextField
              name="name"
              label="Name"
              fullWidth
              margin="normal"
              value={form.name}
              onChange={handleChange}
              required
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextField
              name="passwordHash"
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={form.passwordHash}
              onChange={handleChange}
              // required={!form.id}
            />
            <TextField
              select
              label="Role"
              name="role"
              value={form.role}
              onChange={handleChange}
              margin="normal"
              fullWidth
              sx={{
                height: "44px", // Height of the input
                "& .MuiInputBase-root": {
                  height: "44px", // Adjust height of the actual input box
                },
              }}
            >
              {roles.map((p) => (
                <MenuItem key={p.designationId} value={p.designationId}>
                  {p.designationName}
                </MenuItem>
              ))}
            </TextField>
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

AddEmployee.propTypes = {
  onClose: PropTypes.func.isRequired,
  existingEmployee: PropTypes.object,
};

export default AddEmployee;
