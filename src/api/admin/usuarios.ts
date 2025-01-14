import axios from '@utils/axios';
import { UpdateUserRequest, ApiResponse, RegisterRequest } from './authInterfaces';

// ⬇️ Obtener userId de localStorage
// function getUserIdFromLocalStorage(): string | null {
//     try {
//       const reduxState = localStorage.getItem('reduxState');
//       if (reduxState) {
//         const parsedState = JSON.parse(reduxState);
//         return parsedState?.auth?.user?.id || null;
//       }
//       return null;
//     } catch (error) {
//       console.error('Error reading userId from localStorage:', error);
//       return null;
//     }
//   }

/**
 * Registrar un administrador.
 * @param registerRequest Datos para el registro (fullName, email, password).
 * @returns Respuesta del servidor con la información del nuevo administrador.
 */
export async function registerAdmin(registerRequest: RegisterRequest): Promise<ApiResponse> {
  try {
    const response = await axios.post('/auth/a/register', registerRequest);
    return response.data;
  } catch (error) {
    console.error('Error registering admin:', error);
    throw new Error('Could not register admin');
  }
}
  
  /**
   * Obtener la lista de usuarios con rol 'USER'.
   * @returns Lista de usuarios con el rol USER.
   */
  export async function getUsersWithRoleUser(): Promise<ApiResponse> {
    try {
      const response = await axios.get('/admin/role/user');
      return response.data;
    } catch (error) {
      console.error('Error fetching users with role USER:', error);
      throw new Error('Could not fetch users with role USER');
    }
  }
  
  /**
   * Obtener la lista de todos los usuarios.
   * @returns Lista de todos los usuarios.
   */
  export async function getAllUsers(): Promise<ApiResponse> {
    try {
      const response = await axios.get('/admin/all');
      console.log('response', response);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw new Error('Could not fetch all users');
    }
  }
  
  /**
   * Actualizar los datos de un usuario.
   * @param id ID del usuario a actualizar.
   * @param updateRequest Datos para actualizar (isActive, fullName, email).
   * @returns Usuario actualizado.
   */
  export async function updateUser(
    id: number,
    updateRequest: UpdateUserRequest
  ): Promise<ApiResponse> {
    try {
      const response = await axios.put(`/admin/${id}`, updateRequest);
      return response.data;
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw new Error('Could not update user');
    }
  }
  
  /**
   * Eliminar un usuario por su ID.
   * @param id ID del usuario a eliminar.
   * @returns Respuesta de la operación.
   */
  export async function deleteUser(id: number): Promise<ApiResponse> {
    try {
      const response = await axios.delete(`/admin/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      throw new Error('Could not delete user');
    }
  }
  