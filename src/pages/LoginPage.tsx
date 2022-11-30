import { Link } from 'react-router-dom';
import { SignIn } from '../components/signIn';

import styles from './pagesStyle.module.scss';
import { motion } from 'framer-motion';

const LoginPage = () => {
  return (
    <>
      <SignIn />
      <motion.div
        className={styles.formSwitching}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
        <Link to="/register" className={styles.btnLink}>
          Sing up
        </Link>
      </motion.div>
    </>
  );
};

export default LoginPage;
