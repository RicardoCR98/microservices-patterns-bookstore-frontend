import { http } from "./http";
import { LoginResponse, RegisterRequest, RegisterResponse } from "./authInterfaces";
import axios, { AxiosError } from "axios";

// Función para login de usuario
export const loginUserApi = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await http.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Error en la solicitud de login:", error.response.data);
      } else {
        console.error("Error sin respuesta del servidor:", error.message);
      } 
    } else {
      console.error("Error desconocido:", error);
    }
    throw error;
  }
};

// Función para registro de usuario
export const registerUserApi = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    const response = await http.post<RegisterResponse>("/auth/register", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Error en el registro de usuario:", error.response.data);
      }
    }
    throw error;
  }
};

// Función para login de administrador
export const loginAdminApi = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await http.post<LoginResponse>("/auth/a/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Error en la solicitud de login admin:", error.response.data);
      }
    }
    throw error;
  }
};
