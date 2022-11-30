import { Link } from 'react-router-dom';
import { SignUp } from '../components/signUp';

import styles from './pagesStyle.module.scss';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  return (
    <>
      <SignUp />

      <motion.div
        className={styles.formSwitching}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
        <Link to="/login" className={styles.btnLink}>
          Sing in
        </Link>
      </motion.div>
    </>
  );
};

export default RegisterPage;
