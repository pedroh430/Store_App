import axios from "axios";

const api = axios.create({
    baseURL: "https://192.168.10.194:8080",
});

export default api;