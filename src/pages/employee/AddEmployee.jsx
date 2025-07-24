import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";
import { addEmployee, updateEmployee } from "../../api/employee";

const AddEmployee = ({ onClose, existingEmployee }) => {
  const [form, setForm] = useState({
    id: 0,
    name: "",
    code: "",
    email: "",
    passwordHash: "",
    role: "Employee",
  });

  useEffect(() => {
    if (existingEmployee) {
      setForm(existingEmployee);
    }
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
          <TextField
            name="code"
            label="Code"
            fullWidth
            margin="normal"
            value={form.code}
            onChange={handleChange}
            required
          />
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
            required={!form.id} // only required when adding new
          />
          <TextField
            select
            name="role"
            label="Role"
            fullWidth
            margin="normal"
            value={form.role}
            onChange={handleChange}
            SelectProps={{ native: true }}
          >
            <option value="Admin">Admin</option>
            <option value="Employee">Employee</option>
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
