import { RootState } from "src/store";
import { startLogin, startLogout, startRegister } from "src/store/auth/authThunks";
import { useAppDispatch, useAppSelector } from "../reduxHooks";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: RootState) => state.auth.user);

  const loginUser = (email: string, password: string) => {
    dispatch(startLogin({ email, password, role:"USER" }));
  };

  const loginAdmin = (email: string, password: string) => {
    dispatch(startLogin({ email, password, role:"ADMIN" }));
  };

  const logoutUser = ()=>{
    dispatch(startLogout());
  }

  const logoutAdmin = ()=>{
    dispatch(startLogout());
  }

  const registerUser = (fullName: string, email: string, password: string) => {
    dispatch(startRegister({ fullName, email, password }));
  };

  return { user, loginUser, loginAdmin,logoutUser,logoutAdmin, registerUser };
};
