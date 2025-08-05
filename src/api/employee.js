import axios from "axios";

const API_URL = "https://localhost:7275/api/Employee/";

export const getEmployees = () => axios.get(API_URL + "GetAllEmployee");

export const addEmployee = (Employee) => axios.post(API_URL + "Save", Employee);

export const updateEmployee = (Employee) => axios.put(`${API_URL}Update/${Employee.id}`, Employee);

export const deleteEmployee = (Id) => axios.delete(`${API_URL}Delete/${Id}`);

export const uploadKyc = (formData) =>
  axios.post(`${API_URL}UploadKyc`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const generateEmployeeCode = () => axios.get(API_URL + "GenerateEmployeeCode");
