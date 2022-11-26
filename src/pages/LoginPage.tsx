import { Link } from 'react-router-dom';
import { SignIn } from '../components/SignIn';

const LoginPage = () => {
  return (
    <div>
      <h1>Sign in</h1>
      <SignIn />
      <p>
        Or <Link to="/register">Sing up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
