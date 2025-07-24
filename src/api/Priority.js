import axios from "axios";

const API_URL = "https://localhost:7275/api/Priority/";

export const getPrioritys = () => axios.get(API_URL + "GetAllPriority");

export const addPriority = (Priority) => axios.post(API_URL + "Save", Priority);

export const updatePriority = (Priority) =>
  axios.put(`${API_URL}Update/${Priority.priorityId}`, Priority);

export const deletePriority = (PriorityId) => axios.delete(`${API_URL}Delete/${priorityId}`);
