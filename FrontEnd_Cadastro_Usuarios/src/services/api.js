import axios from "axios";
import { getToken } from './authService';

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(
  (config) => {
    // NÃO adiciona o Authorization em rotas públicas como /auth/login
    const isPublicRoute = config.url.includes("auth/login");

    if (!isPublicRoute) {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);


export default api;
