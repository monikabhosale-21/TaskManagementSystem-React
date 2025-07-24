import axios from "axios";

const BASE_URL = "https://localhost:7275/api";

export const loginUser = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/Auth/Login`, {
    email,
    password,
  });
  return response.data;
};
