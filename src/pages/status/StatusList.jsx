import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  CircularProgress,
  Stack,
  IconButton,
  TextField,
  Button,
  Box,
  Pagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { getStatus, deleteStatus } from "../../api/status";

const StatusList = ({ onEdit }) => {
  const [Statuss, setStatus] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    getStatus()
      .then((res) => {
        setStatus(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleDelete = async (StatusId) => {
    if (window.confirm("Are you sure you want to delete this Status?")) {
      try {
        await deleteStatus(StatusId);
        alert("Status deleted successfully");
        setStatus((prev) => prev.filter((c) => c.StatusId !== StatusId));
      } catch (error) {
        alert("Failed to delete Status");
      }
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredStatuss = Statuss.filter((c) =>
    `${c.StatusName} ${c.mobile}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedStatuss = filteredStatuss.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <CircularProgress sx={{ m: 4 }} />;

  return (
    <MDBox>
      {/* Search + Add Button */}
      <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, mr: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => onEdit(null)}
          sx={{
            height: "40px",
            borderRadius: "8px",
            fontWeight: "bold",
            textTransform: "none",
            color: "#fff",
          }}
        >
          + Add Status
        </Button>
      </MDBox>

      <MDTypography variant="h5" fontWeight="bold" mb={2}>
        Status List
      </MDTypography>

      {/* Status Table */}
      <MDBox component="table" width="100%" sx={{ borderCollapse: "collapse" }}>
        <MDBox component="thead" sx={{ backgroundColor: "#f5f5f5" }}>
          <MDBox component="tr">
            {["Id", "Name", "Actions"].map((header) => (
              <MDBox
                component="th"
                key={header}
                align="left"
                sx={{ padding: "12px", fontWeight: "bold", fontSize: "14px" }}
              >
                {header}
              </MDBox>
            ))}
          </MDBox>
        </MDBox>
        <MDBox component="tbody">
          {paginatedStatuss.map((c, index) => (
            <MDBox
              component="tr"
              key={index}
              sx={{
                borderBottom: "1px solid #e0e0e0",
                "&:hover": { backgroundColor: "#f9f9f9" },
              }}
            >
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{c.statusId}</MDTypography>
              </MDBox>
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{c.statusName}</MDTypography>
              </MDBox>
              <MDBox component="td" sx={{ padding: "10px" }}>
                <Stack direction="row" spacing={1}>
                  <IconButton color="info" onClick={() => onEdit(c)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(c.statusId)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </MDBox>
            </MDBox>
          ))}
        </MDBox>
      </MDBox>

      {/* Pagination Controls */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={Math.ceil(filteredStatuss.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="info"
          shape="rounded"
        />
      </Box>
    </MDBox>
  );
};

StatusList.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

export default StatusList;
