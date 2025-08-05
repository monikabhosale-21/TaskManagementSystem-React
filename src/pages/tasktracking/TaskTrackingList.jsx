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
import { GetAllTaskTracking } from "../../api/Task";

const TaskTrackingList = ({ onEdit }) => {
  const [TaskTrackings, setTaskTrackings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    GetAllTaskTracking()
      .then((res) => {
        setTaskTrackings(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredTaskTrackings = TaskTrackings.filter((c) =>
    `${c.name} ${c.code}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedTaskTrackings = filteredTaskTrackings.slice(
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
      </MDBox>
      <MDTypography variant="h5" fontWeight="bold" mb={2}>
        Task Tracking List
      </MDTypography>

      {/* TaskTracking Table */}
      <MDBox component="table" width="100%" sx={{ borderCollapse: "collapse" }}>
        <MDBox component="thead" sx={{ backgroundColor: "#f5f5f5" }}>
          <MDBox component="tr">
            {["Sr. No", "Task Label", "Assign To", "Operation", "Date Time"].map((header) => (
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
          {paginatedTaskTrackings.map((c, index) => (
            <MDBox
              component="tr"
              key={index}
              sx={{
                borderBottom: "1px solid #e0e0e0",
                "&:hover": { backgroundColor: "#f9f9f9" },
              }}
            >
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </MDTypography>
              </MDBox>
              {/* <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{c.TaskTrackingId}</MDTypography>
              </MDBox> */}
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{c.taskLabel}</MDTypography>
              </MDBox>
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{c.assignTo}</MDTypography>
              </MDBox>
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{c.operation}</MDTypography>
              </MDBox>
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{c.dateTime?.substring(0, 10)}</MDTypography>
              </MDBox>
            </MDBox>
          ))}
        </MDBox>
      </MDBox>

      {/* Pagination Controls */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={Math.ceil(filteredTaskTrackings.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="info"
          shape="rounded"
        />
      </Box>
    </MDBox>
  );
};

TaskTrackingList.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

export default TaskTrackingList;
