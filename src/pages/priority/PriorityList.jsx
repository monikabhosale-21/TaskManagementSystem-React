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
import { getPrioritys, deletePriority } from "../../api/Priority";

const PriorityList = ({ onEdit }) => {
  const [Prioritys, setPrioritys] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    getPrioritys()
      .then((res) => {
        setPrioritys(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleDelete = async (PriorityId) => {
    if (window.confirm("Are you sure you want to delete this Priority?")) {
      try {
        await deletePriority(priorityId);
        alert("Priority deleted successfully");
        setPrioritys((prev) => prev.filter((c) => c.priorityId !== priorityId));
      } catch (error) {
        alert("Failed to delete Priority");
      }
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredPrioritys = Prioritys.filter((c) =>
    `${c.PriorityName} ${c.mobile}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedPrioritys = filteredPrioritys.slice(
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
          + Add Priority
        </Button>
      </MDBox>

      <MDTypography variant="h5" fontWeight="bold" mb={2}>
        Priority List
      </MDTypography>

      {/* Priority Table */}
      <MDBox component="table" width="100%" sx={{ borderCollapse: "collapse" }}>
        <MDBox component="thead" sx={{ backgroundColor: "#f5f5f5" }}>
          <MDBox component="tr">
            {["Id", "Name", "Priority", "Actions"].map((header) => (
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
          {paginatedPrioritys.map((c, index) => (
            <MDBox
              component="tr"
              key={index}
              sx={{
                borderBottom: "1px solid #e0e0e0",
                "&:hover": { backgroundColor: "#f9f9f9" },
              }}
            >
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{c.priorityId}</MDTypography>
              </MDBox>
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{c.priorityName}</MDTypography>
              </MDBox>
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{c.colorCode}</MDTypography>
              </MDBox>
              <MDBox component="td" sx={{ padding: "10px" }}>
                <Stack direction="row" spacing={1}>
                  <IconButton color="info" onClick={() => onEdit(c)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(c.priorityId)}>
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
          count={Math.ceil(filteredPrioritys.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="info"
          shape="rounded"
        />
      </Box>
    </MDBox>
  );
};

PriorityList.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

export default PriorityList;
