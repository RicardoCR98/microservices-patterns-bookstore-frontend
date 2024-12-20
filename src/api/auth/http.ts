import axios from "axios";
import { RootState, store } from "src/store";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string || "http://localhost:8080"; 

export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

http.interceptors.request.use(
  (config) => {
    try {
      const state: RootState = store.getState();
      const token = state.auth?.token;
      const status = state.auth?.status; 

      if (status === "authenticated" && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

    } catch (err) {
       console.error("Error en el interceptor de Axios:", err);
    }
    return config;
  },
  (error) => {
    // Manejo de errores en la solicitud
    return Promise.reject(error);
  }
);
