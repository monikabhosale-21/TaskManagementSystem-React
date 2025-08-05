import React, { useState } from "react";
import { TextField, Button, Box, Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { uploadKyc } from "../../api/employee";

const AddEmployeeKyc = ({ onClose, employeeId }) => {
  const [form, setForm] = useState({
    adharNo: "",
    panNo: "",
    bankAccount: "",
    ifscCode: "",
  });

  const [adharFront, setAdharFront] = useState(null);
  const [adharBack, setAdharBack] = useState(null);
  const [panCard, setPanCard] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e, setter) => setter(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("employeeId", employeeId.toString());
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    if (adharFront) formData.append("adharFront", adharFront);
    if (adharBack) formData.append("adharBack", adharBack);
    if (panCard) formData.append("panCard", panCard);

    // 🔍 Debug log all formData entries
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    try {
      await uploadKyc(formData);
      alert("KYC saved successfully.");
    } catch (error) {
      console.error("KYC upload failed:", error);
      alert("Failed to save KYC. Please try again.");
    }
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Add Employee KYC
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" gap={2} mt={2}>
            <TextField
              label="Adhar No"
              name="adharNo"
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Pan No"
              name="panNo"
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
          </Box>
          <Box display="flex" gap={2} mt={2}>
            <TextField
              label="Bank Account"
              name="bankAccount"
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="IFSC Code"
              name="ifscCode"
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
          </Box>
          <Box display="flex" gap={3} mt={3}>
            <label>Adhar Front:</label>
            <input type="file" onChange={(e) => handleFileChange(e, setAdharFront)} />
            <label>Adhar Back:</label>
            <input type="file" onChange={(e) => handleFileChange(e, setAdharBack)} />
          </Box>
          <Box display="flex" gap={2} mt={2}>
            <label>Pan Card:</label>
            <input type="file" onChange={(e) => handleFileChange(e, setPanCard)} />
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
              Submit
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

AddEmployeeKyc.propTypes = {
  onClose: PropTypes.func.isRequired,
  employeeId: PropTypes.number.isRequired,
};

export default AddEmployeeKyc;
