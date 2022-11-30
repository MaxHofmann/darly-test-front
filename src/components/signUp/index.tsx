import { Form } from '../authForm';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { setUser } from '../../redux/slices/auth/userSlice';
import { useAppDispatch } from '../../redux/store';
import styles from './signUp.module.scss';

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignUp = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
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

  return (
    <div className={styles.wrapForm}>
      <Form title="Sign-up" handleClick={handleSignUp} />
    </div>
  );
};

export { SignUp };
