import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:9000/",
  timeout: 1000,
});

export default axiosInstance;
