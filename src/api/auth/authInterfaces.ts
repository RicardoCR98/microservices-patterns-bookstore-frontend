export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
      id: string;
      name: string;
      token: string;
      role: string;
      expirationDate: number;
    };
  }

  export interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
  }

  export interface RegisterResponse {
    success: boolean;
    message: string;  
    data: {           
      id: number;
      name: string;
      token: string | null;
      role: string;
      expirationDate: number | null;
    } | null;        
  }
  