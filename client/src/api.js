import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// REGISTER API
export const registerUser = (data) => API.post("/auth/register", data);

export const getUsers = () => {
  const token = localStorage.getItem("token");
  return API.get("/auth/getUser", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = (id, updatedData) =>
  API.put(`/auth/updateUser/${id}`, updatedData);


// CREATE EVENT
export const createEvent = (data) => API.post("/event/createEvent", data);
export const getEvents = () => API.get("/event");


export const deleteEvent = (id) =>
  API.delete(`/event/deleteEvent/${id}`);

export const updateEvent = (id, data) =>
  API.put(`/event/updateEvent/${id}`, data);


export default API;

