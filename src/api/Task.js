import axios from "axios";

const API_URL = "https://localhost:7275/api/Task/";

// ✅ This is your main list endpoint
export const getTasks = () => axios.get(API_URL + "GetAllTask");

// ✅ Alias for getTasks so TaskList can use `getAllTasks`
export const getAllTasks = getTasks;

// ✅ Add a new Task
export const addTask = (Task) => axios.post(API_URL + "Save", Task);

// ✅ Update an existing Task
export const updateTask = (Task) => axios.put(`${API_URL}Update/${Task.id}`, Task);

// ✅ Delete Task by ID
export const deleteTask = (id) => axios.delete(`${API_URL}Delete/${id}`);

// ✅ Get single Task by ID (used in AddTask.jsx for editing)
export const getTaskById = (id) => axios.get(`${API_URL}GetTaskById/${id}`);

export const getModulesByProject = (projectId) =>
  axios.get(`${API_URL}GetModuleNameByProject/${projectId}`);

export const GetAllTaskTracking = () => axios.get(API_URL + "GetAllTaskTracking");
