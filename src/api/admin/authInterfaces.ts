// Interface para la solicitud de actualización de un usuario
export interface UpdateUserRequest {
  isActive: boolean | null; // Puede ser null si no se incluye en la solicitud
  fullName: string | null;  // Puede ser null si no se incluye en la solicitud
  email: string | null;     // Puede ser null si no se incluye en la solicitud
  role: string | null;      // Puede ser null si no se incluye en la solicitud
}

// Interface para la respuesta de la API genérica
export interface ApiResponse<T = any> {
  success: boolean; // Indica si la operación fue exitosa
  message: string;  // Mensaje descriptivo de la operación
  data: T;          // Datos específicos de la operación (tipo genérico)
}

// Interface para un usuario (AuthUser) en el sistema
export interface AuthUser {
  id: number;         // ID único del usuario
  fullName: string;   // Nombre completo del usuario
  email: string;      // Correo electrónico del usuario
  isActive: boolean;  // Si el usuario está activo
  role: string;       // Rol del usuario (e.g., ADMIN, USER)
}

// Interface para la lista de usuarios
export interface UserListResponse extends ApiResponse<AuthUser[]> {
  data: AuthUser[]; // Lista de usuarios como parte de la respuesta
}


export interface RegisterRequest {
  fullName: string; // Nombre completo del administrador
  email: string;    // Correo electrónico del administrador
  password: string; // Contraseña del administrador
}
