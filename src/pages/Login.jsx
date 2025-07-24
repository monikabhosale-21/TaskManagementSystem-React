import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://localhost:7071/api/Auth/Login", form);
      const { token, role, name } = response.data;

      // Save token and user info to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);

      // Navigate to appropriate dashboard
      if (role === "Admin") navigate("/dashboard");
      else if (role === "Employee") navigate("/employee/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          margin="normal"
          value={form.password}
          onChange={handleChange}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
