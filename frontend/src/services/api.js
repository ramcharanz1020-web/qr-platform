import axios from "axios";

const API = axios.create({
  baseURL: "http://https://qr-platform-backend-okqq.onrender.com/api",
});

export default API;