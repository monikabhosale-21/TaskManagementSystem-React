// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import {
//   CircularProgress,
//   Stack,
//   IconButton,
//   TextField,
//   Button,
//   Box,
//   Pagination,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import { getEmployees, deleteEmployee } from "../../api/employee";
// import { useNavigate } from "react-router-dom";

// const EmployeeList = ({ onEdit, onAddKyc }) => {
//   const [Employees, setEmployees] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     getEmployees()
//       .then((res) => {
//         setEmployees(res.data.data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm]);

//   const handleDelete = async (EmployeeId) => {
//     if (window.confirm("Are you sure you want to delete this Employee?")) {
//       try {
//         await deleteEmployee(EmployeeId);
//         alert("Employee deleted successfully");
//         setEmployees((prev) => prev.filter((c) => c.id !== EmployeeId));
//       } catch (error) {
//         alert("Failed to delete Employee");
//       }
//     }
//   };

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   const filteredEmployees = Employees.filter((c) =>
//     `${c.name} ${c.code}`.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedEmployees = filteredEmployees.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   if (loading) return <CircularProgress sx={{ m: 4 }} />;

//   const navigate = useNavigate(); // ✅ Always top-level in component

//   const handleAddKyc = (employee) => {
//     navigate("/employee/AddEmployeeKyc", { state: { employee } }); // ✅ OK here
//   };

//   return (
//     <MDBox>
//       {/* Search + Add Button */}
//       <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <TextField
//           label="Search by Name"
//           variant="outlined"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ flexGrow: 1, mr: 2 }}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => onEdit(null)}
//           sx={{
//             height: "40px",
//             borderRadius: "8px",
//             fontWeight: "bold",
//             textTransform: "none",
//             color: "#fff",
//           }}
//         >
//           + Add Employee
//         </Button>
//       </MDBox>

//       <MDTypography variant="h5" fontWeight="bold" mb={2}>
//         Employee List
//       </MDTypography>

//       {/* Employee Table */}
//       <MDBox component="table" width="100%" sx={{ borderCollapse: "collapse" }}>
//         <MDBox component="thead" sx={{ backgroundColor: "#f5f5f5" }}>
//           <MDBox component="tr">
//             {["Id", "Code", "Name", "Email", "Role", "Actions"].map((header) => (
//               <MDBox
//                 component="th"
//                 key={header}
//                 align="left"
//                 sx={{ padding: "12px", fontWeight: "bold", fontSize: "14px" }}
//               >
//                 {header}
//               </MDBox>
//             ))}
//           </MDBox>
//         </MDBox>
//         <MDBox component="tbody">
//           {paginatedEmployees.map((c, index) => (
//             <MDBox
//               component="tr"
//               key={index}
//               sx={{
//                 borderBottom: "1px solid #e0e0e0",
//                 "&:hover": { backgroundColor: "#f9f9f9" },
//               }}
//             >
//               <MDBox component="td" sx={{ padding: "10px" }}>
//                 <MDTypography variant="body2">{c.id}</MDTypography>
//               </MDBox>
//               <MDBox component="td" sx={{ padding: "10px" }}>
//                 <MDTypography variant="body2">{c.code}</MDTypography>
//               </MDBox>
//               <MDBox component="td" sx={{ padding: "10px" }}>
//                 <MDTypography variant="body2">{c.name}</MDTypography>
//               </MDBox>
//               <MDBox component="td" sx={{ padding: "10px" }}>
//                 <MDTypography variant="body2">{c.email}</MDTypography>
//               </MDBox>
//               <MDBox component="td" sx={{ padding: "10px" }}>
//                 <MDTypography variant="body2">{c.role}</MDTypography>
//               </MDBox>
//               <MDBox component="td" sx={{ padding: "10px" }}>
//                 <Stack direction="row" spacing={1}>
//                   <IconButton color="info" onClick={() => onEdit(c)}>
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton color="error" onClick={() => handleDelete(c.id)}>
//                     <DeleteIcon />
//                   </IconButton>
//                   <Button
//                     variant="outlined"
//                     size="small"
//                     onClick={() => onAddKyc(c)}
//                     sx={{ textTransform: "none" }}
//                   >
//                     Add KYC
//                   </Button>
//                 </Stack>
//               </MDBox>
//             </MDBox>
//           ))}
//         </MDBox>
//       </MDBox>

//       {/* Pagination Controls */}
//       <Box display="flex" justifyContent="center" mt={3}>
//         <Pagination
//           count={Math.ceil(filteredEmployees.length / itemsPerPage)}
//           page={currentPage}
//           onChange={handlePageChange}
//           color="info"
//           shape="rounded"
//         />
//       </Box>
//     </MDBox>
//   );
// };

// EmployeeList.propTypes = {
//   onEdit: PropTypes.func.isRequired,
//   onAddKyc: PropTypes.func, // ✅ Add this line
// };

// export default EmployeeList;
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
import { getEmployees, deleteEmployee } from "../../api/employee";

const EmployeeList = ({ onEdit, onAddKyc }) => {
  const [Employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    getEmployees()
      .then((res) => {
        setEmployees(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleDelete = async (EmployeeId) => {
    if (window.confirm("Are you sure you want to delete this Employee?")) {
      try {
        await deleteEmployee(EmployeeId);
        alert("Employee deleted successfully");
        setEmployees((prev) => prev.filter((c) => c.id !== EmployeeId));
      } catch (error) {
        alert("Failed to delete Employee");
      }
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredEmployees = Employees.filter((c) =>
    `${c.name} ${c.code}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <CircularProgress sx={{ m: 4 }} />;

  return (
    <MDBox>
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
          + Add Employee
        </Button>
        {/* <Button variant="contained" color="primary" onClick={() => onEdit(null)}>
          + Add Employee
        </Button> */}
      </MDBox>

      <MDTypography variant="h5" fontWeight="bold" mb={2}>
        Employee List
      </MDTypography>
      <MDBox component="table" width="100%" sx={{ borderCollapse: "collapse" }}>
        <MDBox component="thead" sx={{ backgroundColor: "#f5f5f5" }}>
          <MDBox component="tr">
            {["Id", "Code", "Name", "Email", "Role", "Actions"].map((header) => (
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
          {paginatedEmployees.map((c, index) => (
            <MDBox
              component="tr"
              key={index}
              sx={{
                borderBottom: "1px solid #e0e0e0",
                "&:hover": { backgroundColor: "#f9f9f9" },
              }}
            >
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{c.id}</MDTypography>
              </MDBox>
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{c.code}</MDTypography>
              </MDBox>
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{c.name}</MDTypography>
              </MDBox>
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{c.email}</MDTypography>
              </MDBox>
              <MDBox component="td" sx={{ padding: "10px" }}>
                <MDTypography variant="body2">{c.role}</MDTypography>
              </MDBox>
              <MDBox component="td" sx={{ padding: "10px" }}>
                <Stack direction="row" spacing={1}>
                  <IconButton color="info" onClick={() => onEdit(c)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(c.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <Button variant="outlined" size="small" onClick={() => onAddKyc(c.id)}>
                    Add KYC
                  </Button>
                </Stack>
              </MDBox>
            </MDBox>
          ))}
        </MDBox>
      </MDBox>

      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={Math.ceil(filteredEmployees.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="info"
          shape="rounded"
        />
      </Box>
    </MDBox>
  );
};

EmployeeList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onAddKyc: PropTypes.func.isRequired,
};

export default EmployeeList;
