import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
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
import { getTasks, deleteTask } from "../../api/Task";

const TaskList = ({ onEdit }) => {
  const [Tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const userRole = localStorage.getItem("role");

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const itemsPerPage = 5;

  // useEffect(() => {
  //   getTasks()
  //     .then((res) => {
  //       setTasks(res.data.data);
  //       setLoading(false);
  //     })
  //     .catch(() => setLoading(false));
  // }, []);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTasks();
        const allTasks = res.data.data || [];

        if (userRole === "Employee") {
          const userId = parseInt(localStorage.getItem("id"));
          const filtered = allTasks.filter((t) => t.assignedEmployeeId === userId);
          setTasks(filtered);
        } else {
          setTasks(allTasks);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userRole]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleDelete = async (TaskId) => {
    if (window.confirm("Are you sure you want to delete this Task?")) {
      try {
        await deleteTask(TaskId);
        alert("Task deleted successfully");
        setTasks((prev) => prev.filter((c) => c.taskId !== TaskId));
      } catch (error) {
        alert("Failed to delete Task");
      }
    }
  };
  const handleMenuClick = (event, task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTask(null);
  };

  const handleEdit = () => {
    onEdit(selectedTask);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    handleDelete(selectedTask.taskId);
    handleMenuClose();
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredTasks = Tasks.filter((c) =>
    `${c.name} ${c.code}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedTasks = filteredTasks.slice(
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
        {userRole === "Admin" && (
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
            + Add Task
          </Button>
        )}
      </MDBox>

      <MDTypography variant="h5" fontWeight="bold" mb={2}>
        Task List
      </MDTypography>

      {/* Task Table */}
      <MDBox component="table" width="100%" sx={{ borderCollapse: "collapse" }}>
        <MDBox component="thead" sx={{ backgroundColor: "#f5f5f5" }}>
          <MDBox component="tr">
            {[
              "Sr. No",
              "Project",
              "Module",
              "Task Label",
              "Description",
              "Priority",
              "Assigned To",
              "Status",
              "Actions",
            ].map((header) => (
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
          {paginatedTasks.map((c, index) => (
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
                <MDTypography variant="body2">{c.taskId}</MDTypography>
              </MDBox> */}
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{c.projectName}</MDTypography>
              </MDBox>
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{c.moduleName}</MDTypography>
              </MDBox>
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{c.taskLabel}</MDTypography>
              </MDBox>
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{c.taskDescription}</MDTypography>
              </MDBox>
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{c.priorityName}</MDTypography>
              </MDBox>
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{c.employeeName}</MDTypography>
              </MDBox>
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{c.statusName}</MDTypography>
              </MDBox>
              <MDBox component="td" sx={{ padding: "10px" }}>
                <IconButton onClick={(e) => handleMenuClick(e, c)}>
                  <MoreVertIcon />
                </IconButton>
              </MDBox>
            </MDBox>
          ))}
        </MDBox>
      </MDBox>

      {/* Pagination Controls */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={Math.ceil(filteredTasks.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="info"
          shape="rounded"
        />
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {(userRole === "Admin" || userRole === "Employee") && (
          <MenuItem onClick={handleEdit} sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            Edit
          </MenuItem>
        )}
        {userRole === "Admin" && (
          <MenuItem onClick={handleDeleteClick}>
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        )}
      </Menu>
    </MDBox>
  );
};

TaskList.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

export default TaskList;
