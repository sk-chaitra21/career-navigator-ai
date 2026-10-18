import axios from "axios";

const api = axios.create({
  baseURL: "baseURL: "https://career-navigator-ai-api.onrender.com",",
  headers: {
    "Content-Type": "application/json",
  },
});


// Automatically attach JWT token to protected requests
api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


export default api;
