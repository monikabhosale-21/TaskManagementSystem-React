import axios from "axios";

const API_URL = "https://localhost:7275/api/Project/";

// ✅ This is your main list endpoint
export const getProjects = () => axios.get(API_URL + "GetAllProject");

// ✅ Alias for getProjects so ProjectList can use `getAllProjects`
export const getAllProjects = getProjects;

// ✅ Add a new project
export const addProject = (project) => axios.post(API_URL + "Save", project);

// ✅ Update an existing project
export const updateProject = (project) =>
  axios.put(`${API_URL}Update/${project.projectId}`, project);

// ✅ Delete project by ID
export const deleteProject = (id) => axios.delete(`${API_URL}Delete/${id}`);

// ✅ Get single project by ID (used in AddProject.jsx for editing)
export const getProjectById = (id) => axios.get(`${API_URL}GetProjectById/${id}`);
