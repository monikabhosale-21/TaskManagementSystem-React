import axios from "axios";

const API_URL = "https://localhost:7275/api/Status/";

export const getStatus = () => axios.get(API_URL + "GetAllStatus");

export const addStatus = (Status) => axios.post(API_URL + "Save", Status);

export const updateStatus = (Status) => axios.put(`${API_URL}Update/${Status.statusId}`, Status);

export const deleteStatus = (StatusId) => axios.delete(`${API_URL}Delete/${statusId}`);
