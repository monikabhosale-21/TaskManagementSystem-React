// // import React, { useState, useEffect } from "react";
// // import { useLocation } from "react-router-dom";
// // import { TextField, Button, MenuItem, Typography, Box } from "@mui/material";
// // import { getEmployees } from "../../api/employee";

// // const AddKyc = () => {
// //   const location = useLocation();
// //   const selectedEmployee = location.state?.employee;

// //   const [employeeList, setEmployeeList] = useState([]);
// //   const [form, setForm] = useState({
// //     employeeId: "",
// //     adharNo: "",
// //     panNo: "",
// //     bankAccNo: "",
// //     ifscCode: "",
// //     // ... file fields handled separately
// //   });

// //   useEffect(() => {
// //     const fetchEmployees = async () => {
// //       const res = await getEmployees();
// //       setEmployeeList(res.data.data || []);
// //     };
// //     fetchEmployees();
// //   }, []);

// //   useEffect(() => {
// //     if (selectedEmployee) {
// //       setForm((prev) => ({ ...prev, employeeId: selectedEmployee.id }));
// //     }
// //   }, [selectedEmployee]);

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // TODO: handle file uploads and API call
// //     alert("KYC submitted!");
// //   };

// //   return (
// //     <Box mt={3} p={2}>
// //       <Typography variant="h5" gutterBottom>
// //         Add KYC
// //       </Typography>
// //       <form onSubmit={handleSubmit}>
// //         <TextField
// //           select
// //           label="Employee Name"
// //           name="employeeId"
// //           value={form.employeeId}
// //           onChange={handleChange}
// //           fullWidth
// //           margin="normal"
// //         >
// //           {employeeList.map((e) => (
// //             <MenuItem key={e.id} value={e.id}>
// //               {e.name}
// //             </MenuItem>
// //           ))}
// //         </TextField>

// //         <TextField
// //           label="Aadhar No"
// //           name="adharNo"
// //           value={form.adharNo}
// //           onChange={handleChange}
// //           fullWidth
// //           margin="normal"
// //         />
// //         <TextField
// //           label="PAN No"
// //           name="panNo"
// //           value={form.panNo}
// //           onChange={handleChange}
// //           fullWidth
// //           margin="normal"
// //         />
// //         <TextField
// //           label="Bank Account No"
// //           name="bankAccNo"
// //           value={form.bankAccNo}
// //           onChange={handleChange}
// //           fullWidth
// //           margin="normal"
// //         />
// //         <TextField
// //           label="IFSC Code"
// //           name="ifscCode"
// //           value={form.ifscCode}
// //           onChange={handleChange}
// //           fullWidth
// //           margin="normal"
// //         />

// //         <Button variant="contained" type="submit" sx={{ mt: 2 }}>
// //           Submit KYC
// //         </Button>
// //       </form>
// //     </Box>
// //   );
// // };

// // export default AddKyc;
// import React, { useState } from "react";
// import { addEmployee, uploadKyc } from "../../api/employee";
// import { TextField, Button, Card, CardContent, Typography, Grid } from "@mui/material";

// const AddEmployee = () => {
//   const [employee, setEmployee] = useState({
//     name: "",
//     code: "",
//     email: "",
//   });

//   const [kyc, setKyc] = useState({
//     adharNo: "",
//     panNo: "",
//     bankAccountNo: "",
//     ifscCode: "",
//     adharFront: null,
//     adharBack: null,
//     panCard: null,
//   });

//   const [employeeId, setEmployeeId] = useState(null);

//   const handleEmployeeChange = (e) => setEmployee({ ...employee, [e.target.name]: e.target.value });

//   const handleKycChange = (e) => setKyc({ ...kyc, [e.target.name]: e.target.value });

//   const handleFileChange = (e) => setKyc({ ...kyc, [e.target.name]: e.target.files[0] });

//   const handleAddEmployee = async () => {
//     const res = await addEmployee(employee);
//     setEmployeeId(res.data.id);
//     alert("Employee Added!");
//   };

//   const handleUploadKyc = async () => {
//     const formData = new FormData();
//     formData.append("EmployeeId", employeeId);
//     formData.append("AdharNo", kyc.adharNo);
//     formData.append("PanNo", kyc.panNo);
//     formData.append("BankAccountNo", kyc.bankAccountNo);
//     formData.append("IfscCode", kyc.ifscCode);
//     if (kyc.adharFront) formData.append("adharFront", kyc.adharFront);
//     if (kyc.adharBack) formData.append("adharBack", kyc.adharBack);
//     if (kyc.panCard) formData.append("panCard", kyc.panCard);

//     await uploadKyc(formData);
//     alert("KYC Uploaded!");
//   };

//   return (
//     <Card sx={{ mt: 3 }}>
//       <CardContent>
//         <Typography variant="h5">Add Employee</Typography>
//         <form>
//           <Grid container spacing={2}>
//             <Grid item xs={4}>
//               <TextField name="name" label="Name" fullWidth onChange={handleEmployeeChange} />
//             </Grid>
//             <Grid item xs={4}>
//               <TextField name="code" label="Code" fullWidth onChange={handleEmployeeChange} />
//             </Grid>
//             <Grid item xs={4}>
//               <TextField name="email" label="Email" fullWidth onChange={handleEmployeeChange} />
//             </Grid>
//             <Grid item xl={12}>
//               <Grid item xs={4}></Grid>
//               <Grid item xs={4}>
//                 <Button variant="contained" onClick={handleAddEmployee}>
//                   Save Employee
//                 </Button>
//               </Grid>
//             </Grid>

//             {employeeId && (
//               <>
//                 <Grid item xs={4}>
//                   <TextField name="adharNo" label="Adhar No" fullWidth onChange={handleKycChange} />
//                 </Grid>
//                 <Grid item xs={4}>
//                   <TextField name="panNo" label="Pan No" fullWidth onChange={handleKycChange} />
//                 </Grid>
//                 <Grid item xs={4}>
//                   <TextField
//                     name="bankAccountNo"
//                     label="Bank Account No"
//                     fullWidth
//                     onChange={handleKycChange}
//                   />
//                 </Grid>
//                 <Grid item xs={4}>
//                   <TextField
//                     name="ifscCode"
//                     label="IFSC Code"
//                     fullWidth
//                     onChange={handleKycChange}
//                   />
//                 </Grid>
//                 <Grid item xs={4}>
//                   <input type="file" name="adharFront" onChange={handleFileChange} />
//                 </Grid>
//                 <Grid item xs={4}>
//                   <input type="file" name="adharBack" onChange={handleFileChange} />
//                 </Grid>
//                 <Grid item xs={4}>
//                   <input type="file" name="panCard" onChange={handleFileChange} />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Button variant="contained" onClick={handleUploadKyc}>
//                     Upload KYC
//                   </Button>
//                 </Grid>
//               </>
//             )}
//           </Grid>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default AddEmployee;

import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";

const AddEmployeeKyc = ({ employeeId }) => {
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

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("employeeId", employeeId);
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    if (adharFront) formData.append("adharFront", adharFront);
    if (adharBack) formData.append("adharBack", adharBack);
    if (panCard) formData.append("panCard", panCard);

    await axios.post("https://localhost:7275/api/EmployeeKyc/upload", formData);
    alert("KYC saved");
  };

  return (
    <div>
      <TextField label="Adhar No" name="adharNo" onChange={handleChange} fullWidth margin="dense" />
      <TextField label="Pan No" name="panNo" onChange={handleChange} fullWidth margin="dense" />
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

      <label>Adhar Front:</label>
      <input type="file" onChange={(e) => handleFileChange(e, setAdharFront)} />

      <label>Adhar Back:</label>
      <input type="file" onChange={(e) => handleFileChange(e, setAdharBack)} />

      <label>Pan Card:</label>
      <input type="file" onChange={(e) => handleFileChange(e, setPanCard)} />

      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

AddEmployeeKyc.propTypes = {
  employeeId: PropTypes.number,
};
export default AddEmployeeKyc;
