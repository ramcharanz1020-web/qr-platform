import axios from "axios";

const localApiUrl = "http://localhost:5000/api";
const deployedApiUrl = "https://qr-platform-backend-okqq.onrender.com/api";

const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (isLocalhost ? localApiUrl : deployedApiUrl),
});

export default API;
