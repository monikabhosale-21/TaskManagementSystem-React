import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";
import { addStatus, updateStatus } from "../../api/status";

const AddStatus = ({ onClose, existingStatus }) => {
  const [form, setForm] = useState({
    statusId: 0,
    StatusName: "",
  });

  useEffect(() => {
    if (existingStatus) {
      setForm({
        statusId: existingStatus.statusId,
        StatusName: existingStatus.statusName,
      });
    }
  }, [existingStatus]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.statusId) {
        await updateStatus(form);
        alert("Status updated successfully");
      } else {
        await addStatus(form);
        alert("Status added successfully");
      }
      setForm({ StatusName: "" });
      onClose();
    } catch (error) {
      alert("Error saving Status");
      console.log(error);
    }
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {form.statusId ? "Edit Status" : "Add Status"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="StatusName"
            label="Name"
            fullWidth
            margin="normal"
            value={form.StatusName}
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
              {form.statusId ? "Update" : "Submit"}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

AddStatus.propTypes = {
  onClose: PropTypes.func.isRequired,
  existingStatus: PropTypes.object,
};

export default AddStatus;
