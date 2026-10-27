import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://chatify-7mge.onrender.com",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  let token = localStorage.getItem("authToken");
  if (!token) {
    try {
      const authData = JSON.parse(localStorage.getItem("ChatApp") || "null");
      token = authData?.token;
      if (token) {
        localStorage.setItem("authToken", token);
      }
    } catch {
      localStorage.removeItem("ChatApp");
    }
  }

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;