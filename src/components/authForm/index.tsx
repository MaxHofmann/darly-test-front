import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './authForm.module.scss';

import { motion } from 'framer-motion';

interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
}

interface IFormInputs {
  email: string;
  password: string;
}

const Form: FC<FormProps> = ({ title, handleClick }) => {
  const onSubmit: SubmitHandler<IFormInputs> = (data) => handleClick(data.email, data.password);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: 0.1,
        ease: [0, 0.21, 0.2, 0.01],
      }}
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}>
      <h1>{title}</h1>

      <div className={styles.inputWrap}>
        <label className={styles.inputLabel}>Email</label>
        <input
          type="text"
          className={styles.inputText}
          placeholder="Email"
          {...register('email', { required: true, pattern: /.+@.+/, minLength: 8 })}
        />

        {errors?.email?.type === 'required' && (
          <div className={styles.inputError}>Email is required.</div>
        )}
        {errors?.email?.type === 'minLength' && (
          <div className={styles.inputError}>Min length email is 8.</div>
        )}
        {errors?.email?.type === 'pattern' && (
          <div className={styles.inputError}>Email should be in xxx@yyy.zzz format</div>
        )}
      </div>

      <div className={styles.inputWrap}>
        <label className={styles.inputLabel}>Password</label>
        <input
          type="text"
          className={styles.inputText}
          placeholder="Password"
          {...register('password', { required: true, maxLength: 18, minLength: 8 })}
        />
        {errors?.password?.type === 'required' && (
          <div className={styles.inputError}>Password is required.</div>
        )}
        {errors?.password?.type === 'maxLength' && (
          <div className={styles.inputError}>Max length password is 18.</div>
        )}
        {errors?.password?.type === 'minLength' && (
          <div className={styles.inputError}>Min length password is 8.</div>
        )}
      </div>

      <div
        className={
          errors?.password || errors?.email ? styles.inputSubmitError : styles.inputSubmitWrap
        }>
        <input type="submit" value={title} className={styles.inputSubmit} />
      </div>
    </motion.form>
  );
};

export { Form };
