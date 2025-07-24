import axios from "axios";

const API_URL = "https://localhost:7275/api/ProjectModule/";

// ✅ This is your main list endpoint
export const getProjectModules = () => axios.get(API_URL + "GetAllProjectModule");

// ✅ Alias for getProjectModules so ProjectModuleList can use `getAllProjectModules`
export const getAllProjectModules = getProjectModules;

// ✅ Add a new ProjectModule
export const addProjectModule = (ProjectModule) => axios.post(API_URL + "Save", ProjectModule);

// ✅ Update an existing ProjectModule
export const updateProjectModule = (ProjectModule) =>
  axios.put(`${API_URL}Update/${ProjectModule.moduleId}`, ProjectModule);

// ✅ Delete ProjectModule by ID
export const deleteProjectModule = (id) => axios.delete(`${API_URL}Delete/${id}`);

// ✅ Get single ProjectModule by ID (used in AddProjectModule.jsx for editing)
export const getProjectModuleById = (id) => axios.get(`${API_URL}GetProjectModuleById/${id}`);
