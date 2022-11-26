import { Link } from 'react-router-dom';
import { SignUp } from '../components/SignUp';

const RegisterPage = () => {
  return (
    <div>
      <h1>Sign up</h1>
      <SignUp />
      <p>
        Already have an account? <Link to="/login">Sing in</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
