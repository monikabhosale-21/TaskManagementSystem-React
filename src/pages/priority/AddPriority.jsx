import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";
import { addPriority, updatePriority } from "../../api/Priority";

const AddPriority = ({ onClose, existingPriority }) => {
  const [form, setForm] = useState({
    PriorityId: 0,
    PriorityName: "",
    ColorCode: "",
  });

  useEffect(() => {
    if (existingPriority) {
      setForm({
        PriorityId: existingPriority.PriorityId,
        PriorityName: existingPriority.PriorityName,
        ColorCode: existingPriority.ColorCode,
      });
    }
  }, [existingPriority]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.PriorityId) {
        await updatePriority(form);
        alert("Priority updated successfully");
      } else {
        await addPriority(form);
        alert("Priority added successfully");
      }
      setForm({ PriorityName: "" });
      onClose();
    } catch (error) {
      alert("Error saving Priority");
      console.log(error);
    }
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {form.PriorityId ? "Edit Priority" : "Add Priority"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="PriorityName"
            label="Priority Name"
            fullWidth
            margin="normal"
            value={form.PriorityName}
            onChange={handleChange}
            required
          />
          <TextField
            name="ColorCode"
            label="ColorCode"
            fullWidth
            margin="normal"
            value={form.ColorCode}
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
              {form.PriorityId ? "Update" : "Submit"}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

AddPriority.propTypes = {
  onClose: PropTypes.func.isRequired,
  existingPriority: PropTypes.object,
};

export default AddPriority;
