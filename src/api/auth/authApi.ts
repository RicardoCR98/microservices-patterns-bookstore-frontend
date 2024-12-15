import { http } from "../http";
import { LoginResponse, RegisterRequest, RegisterResponse } from "./authInterfaces";

export const loginUserApi = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await http.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  console.log(response);
  return response.data;
};

export const registerUserApi = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await http.post<RegisterResponse>("/auth/register", data);
  return response.data; 
};

export const loginAdminApi = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await http.post<LoginResponse>("/auth/a/login", {
    email,
    password,
  });
  return response.data;
};
