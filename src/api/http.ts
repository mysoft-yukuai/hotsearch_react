import axios from "axios";

const apiClient = axios.create({
  baseURL: "//localhost:9001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
