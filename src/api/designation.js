/* eslint-disable prettier/prettier */
import axios from "axios";

const API_URL = "https://localhost:7275/api/Designation/";

export const getDesignations = () => axios.get(API_URL + "GetAllDesignation");

export const addDesignation = (Designation) => axios.post(API_URL + "Save", Designation);

export const updateDesignation = (Designation) =>
  axios.put(`${API_URL}Update/${Designation.DesignationId}`, Designation);

export const deleteDesignation = (DesignationId) =>
  axios.delete(`${API_URL}Delete/${DesignationId}`);

export const getAllCities = () => axios.get(API_URL + "GetCityName");
