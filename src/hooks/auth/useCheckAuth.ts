import { useAppSelector } from '@hooks/reduxHooks';
import { RootState } from 'src/store';

export const useCheckAuth = () => {
  const { status, user, token } = useAppSelector((state: RootState) => state.auth);
  return { status: status || "unauthenticated", role: user?.role ?? null, token: token ?? null  };
};
