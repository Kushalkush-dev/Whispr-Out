import axios from "axios";


const axiosClient = axios.create({
  // use import.meta.env.MODE (Vite's standard) to detect the mode
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api",
  withCredentials: true,
});

export default axiosClient;