import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// REGISTER API
export const registerUser = (data) => API.post("/auth/register", data);

export default API;