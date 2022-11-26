import { useSelector } from 'react-redux';

interface userTypes {
  email: string;
  token: string;
  id: string;
}

interface RootState {
  user: userTypes;
}

export function useAuth() {
  const { email, token, id } = useSelector((state: RootState) => state.user);

  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
}
