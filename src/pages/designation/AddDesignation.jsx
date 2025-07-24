import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";
import { addDesignation, updateDesignation, getAllCities } from "../../api/designation";

const AddDesignation = ({ onClose, existingDesignation }) => {
  const [form, setForm] = useState({
    DesignationName: "",
  });
  const [cities, setCities] = useState([]);
  useEffect(() => {
    if (existingDesignation) {
      setForm({
        DesignationId: existingDesignation.designationId,
        DesignationName: existingDesignation.designationName,
      });
    }
    getAllCities()
      .then((res) => {
        if (res.data && res.data.data) {
          setCities(res.data.data);
        }
      })
      .catch((err) => console.error("Error loading cities:", err));
  }, [existingDesignation]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.DesignationId) {
        await updateDesignation(form);
        alert("Designation updated successfully");
      } else {
        await addDesignation(form);
        alert("Designation added successfully");
      }
      setForm({ DesignationName: "" });
      onClose();
    } catch (error) {
      alert("Error saving Designation");
      console.log(error);
    }
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {form.DesignationId ? "Edit Designation" : "Add Designation"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="DesignationName"
            label="Name"
            fullWidth
            margin="normal"
            value={form.DesignationName}
            onChange={handleChange}
            required
          />
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
              {form.DesignationId ? "Update" : "Submit"}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

AddDesignation.propTypes = {
  onClose: PropTypes.func.isRequired,
  existingDesignation: PropTypes.object,
};

export default AddDesignation;
