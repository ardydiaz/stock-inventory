import axios from "axios";
const API_BASE = "http://127.0.0.1:8000/api";


const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Auto-fetch token if not present
api.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("token");

  if (!token) {
    try {
      const res = await axios.post(`${API_BASE}/login`, {
        email: "ardy@gmail.com",   // your fixed login
        password: "123456",        // your fixed password
      });
      token = res.data.token;
      console.log("Fetched token:", token);
      localStorage.setItem("token", token);
    } catch (err) {
      console.error("Failed to fetch token", err.response?.data || err);
    }
  }

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;