import React from 'react';
import { Form } from './Form';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../redux/slices/userSlice';
import { useAppDispatch } from '../hooks/redux-hooks';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignIn = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          }),
        );
        navigate('/');
      })
      .catch(console.error);
  };

  return <Form title="sign-in" handleClick={handleSignIn} />;
};

export { SignIn };
