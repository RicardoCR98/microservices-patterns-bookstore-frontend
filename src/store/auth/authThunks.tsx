import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkingCredentials, login, logout, setError } from './authSlice';
import { loginAdminApi, loginUserApi, registerUserApi } from 'src/api';

export const startLogin = createAsyncThunk(
  'auth/startLogin',
  async ({ email, password, role }: { email: string; password: string; role: 'USER' | 'ADMIN' }, { dispatch }) => {
    dispatch(checkingCredentials());
    try {
      const data = role === 'USER' ? await loginUserApi(email, password) : await loginAdminApi(email, password);
      if (!data.success) {
        dispatch(logout({ errorMessage: data.message || 'Login failed' }));
        return;
      }

      const { id, name, token, expirationDate } = data.data;

      const newAuthData = {
        user: { id, role, email, name},
        token,
        expirationDate
      };

      // Almacenar el token en localStorage
      localStorage.setItem('serviceToken', token);

      //console.log('newAuthData',newAuthData);
      // localStorage.setItem("tesis-user",JSON.stringify(newAuthData));

      dispatch(login(newAuthData));
    } catch (error: any) {
      const message = error.response?.data?.message || 'Network error or invalid credentials';
      dispatch(setError(message));
    }
  }
);

export const startLogout = createAsyncThunk('auth/startLogout', async (_, { dispatch }) => {
  // Eliminar token del localStorage al cerrar sesión
  localStorage.removeItem('serviceToken');
  dispatch(logout({}));
});


export const startRegister = createAsyncThunk(
  "auth/startRegister",
  async (
    { fullName, email, password }: { fullName: string; email: string; password: string },
    { dispatch }
  ) => {
    dispatch(checkingCredentials()); // Indica que está verificando credenciales
    try {
      // Llama a la API de registro
      const response = await registerUserApi({ fullName, email, password });

      if (!response.success) {
        // Si `success` es false, dispara un error
        dispatch(setError(response.message || "Registro fallido"));
        return;
      }

      // Extraer datos de la respuesta
      const { id, name, token, role, expirationDate } = response.data!;

      // Construir los datos de autenticación reales
      const newAuthData = {
        user: { id, role, email, name},
        token,
        expirationDate,
      };

      // Guardar el token en localStorage
      localStorage.setItem("serviceToken", token || "");

      // Cambiar el estado a "authenticated"
      dispatch(login(newAuthData));
    } catch (error: any) {
      // Manejo de errores (si no responde el backend o hay problemas en la API)
      const message = error.response?.data?.message || "Error en el registro";
      dispatch(setError(message));
    }
  }
);
