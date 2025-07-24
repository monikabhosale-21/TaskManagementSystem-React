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
import { getProjectModules, deleteProjectModule } from "../../api/ProjectModule";

const ProjectModuleList = ({ onEdit }) => {
  const [ProjectModules, setProjectModules] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    getProjectModules()
      .then((res) => {
        setProjectModules(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleDelete = async (ModuleId) => {
    if (window.confirm("Are you sure you want to delete this ProjectModule?")) {
      try {
        await deleteProjectModule(ModuleId);
        alert("ProjectModule deleted successfully");
        setProjectModules((prev) => prev.filter((p) => p.ModuleId !== ModuleId));
      } catch (error) {
        alert("Failed to delete ProjectModule");
      }
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredProjectModules = ProjectModules.filter((p) =>
    `${p.ProjectModuleName} ${p.reference}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProjectModules = filteredProjectModules.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <CircularProgress sx={{ m: 4 }} />;

  return (
    <MDBox>
      {/* Search and Add */}
      <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Search Project Module"
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
          + Add Project Module
        </Button>
      </MDBox>

      <MDTypography variant="h5" fontWeight="bold" mb={2}>
        ProjectModule List
      </MDTypography>

      {/* Table */}
      <MDBox component="table" width="100%" sx={{ borderCollapse: "collapse" }}>
        <MDBox component="thead" sx={{ backgroundColor: "#f5f5f5" }}>
          <MDBox component="tr">
            {["Module Name", "Project Name", "Status", "Actions"].map((header) => (
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
          {paginatedProjectModules.map((p) => (
            <MDBox
              component="tr"
              key={p.ModuleId}
              sx={{
                borderBottom: "1px solid #e0e0e0",
                "&:hover": { backgroundColor: "#f9f9f9" },
              }}
            >
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{p.moduleName}</MDTypography>
              </MDBox>
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{p.projectName}</MDTypography>
              </MDBox>
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{p.statusName}</MDTypography>
              </MDBox>
              <MDBox component="td" sx={{ padding: "10px" }}>
                <Stack direction="row" spacing={1}>
                  <IconButton color="info" onClick={() => onEdit(p)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(p.ModuleId)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </MDBox>
            </MDBox>
          ))}
          {paginatedProjectModules.length === 0 && (
            <MDBox component="tr">
              <MDBox component="td" colSpan={6} align="center" sx={{ p: 2 }}>
                <MDTypography variant="body2" color="textSecondary">
                  No ProjectModules found.
                </MDTypography>
              </MDBox>
            </MDBox>
          )}
        </MDBox>
      </MDBox>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={Math.ceil(filteredProjectModules.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="info"
          shape="rounded"
        />
      </Box>
    </MDBox>
  );
};

ProjectModuleList.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

export default ProjectModuleList;
