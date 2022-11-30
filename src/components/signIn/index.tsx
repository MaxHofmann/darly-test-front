import React from 'react';
import { Form } from '../authForm';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from 'firebase/auth';
import { setUser } from '../../redux/slices/auth/userSlice';
import { useAppDispatch } from '../../redux/store';

import styles from './signIn.module.scss';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignIn = (email: string, password: string) => {
    const auth = getAuth();

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token: user.refreshToken,
            }),
          );
          navigate('/');
        });
      })
      .catch(console.error);
  };

  return (
    <div className={styles.wrapForm}>
      <Form title="Sign-in" handleClick={handleSignIn} />
    </div>
  );
};

export { SignIn };
