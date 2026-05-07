// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // REGISTER API
// export const registerUser = (data) => API.post("/auth/register", data);

// export default API;

import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
});

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const getUsers = () => API.get("/users");

export default API;