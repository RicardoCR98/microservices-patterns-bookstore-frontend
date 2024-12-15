export interface User {
  id: string | null;
  role: "USER" | "ADMIN" | null;
  email: string | null;
  name: string | null;
  photoURL: string | null;
}

export interface AuthState {
  status: "checking" | "not-authenticated" | "authenticated";
  user: User | null;
  token: string | null;
  expirationDate: number | null;
  errorMessage: string | null;
}
