import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './addForm.module.scss';
import { useAppDispatch } from '../../redux/store';
import { setPopupForm } from '../../redux/slices/Items/itemSlice';

import { motion } from 'framer-motion';
import axios from 'axios';

interface FormProps {
  title: string;
}

interface IFormInputs {
  firsName: string;
  lastName: string;
  themeName: string;
  age: number;
  commnet: string;
}

const AddForm: FC<FormProps> = ({ title }) => {
  const dispatch = useAppDispatch();

  const handleAddComment = async (
    firsName: string,
    lastName: string,
    themeName: string,
    age: number,
    commnet: string,
  ) => {
    try {
      let obj = {
        firsName: firsName,
        lastName: lastName,
        themeName: themeName,
        age: age,
        commnet: commnet,
      };

      await axios
        .post('https://63837db41ada9475c80134c2.mockapi.io/comments', obj)
        .then(({ data }) => {
          dispatch(setPopupForm(false));
        });
    } catch (error) {
      console.error('Error adding file');
    }
  };

  const onSubmit: SubmitHandler<IFormInputs> = (data) =>
    handleAddComment(data.firsName, data.lastName, data.themeName, data.age, data.commnet);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <button onClick={() => dispatch(setPopupForm(false))} className={styles.buttonClose}></button>

      <h1>{title}</h1>

      <div className={styles.inputWrap}>
        <label className={styles.inputLabel}>FirsName</label>
        <input
          type="text"
          className={styles.inputText}
          placeholder="Firs name"
          {...register('firsName', { required: true })}
        />

        {errors?.firsName?.type === 'required' && (
          <div className={styles.inputError}>FirsName is required.</div>
        )}
      </div>

      <div className={styles.inputWrap}>
        <label className={styles.inputLabel}>LastName</label>
        <input
          type="text"
          className={styles.inputText}
          placeholder="Last name"
          {...register('lastName', { required: true })}
        />

        {errors?.lastName?.type === 'required' && (
          <div className={styles.inputError}>lastName is required.</div>
        )}
      </div>

      <div className={styles.inputWrap}>
        <label className={styles.inputLabel}>Theme name</label>
        <input
          type="text"
          className={styles.inputText}
          placeholder="Theme name"
          {...register('themeName', { required: true, minLength: 3 })}
        />

        {errors?.themeName?.type === 'required' && (
          <div className={styles.inputError}>Theme name is required.</div>
        )}
        {errors?.themeName?.type === 'minLength' && (
          <div className={styles.inputError}>Min length theme name is 3.</div>
        )}
      </div>

      <div className={styles.inputWrap}>
        <label className={styles.inputLabel}>Age</label>
        <input
          type="number"
          className={styles.inputText}
          placeholder="Age"
          {...register('age', { required: true, valueAsNumber: true })}
        />

        {errors?.age?.type === 'required' && (
          <div className={styles.inputError}>Age is required.</div>
        )}
        {errors?.age?.type === 'valueAsNumber' && (
          <div className={styles.inputError}>Please enter number.</div>
        )}
      </div>

      <div className={styles.inputWrap}>
        <label className={styles.inputLabel}>Commnet</label>
        <textarea
          className={styles.textareaText}
          placeholder="Commnet"
          {...register('commnet', { required: true, maxLength: 300, minLength: 8 })}></textarea>
        {errors?.commnet?.type === 'required' && (
          <div className={styles.inputError}>Commnet is required.</div>
        )}
        {errors?.commnet?.type === 'maxLength' && (
          <div className={styles.inputError}>Max length commnet is 300.</div>
        )}
        {errors?.commnet?.type === 'minLength' && (
          <div className={styles.inputError}>Min length commnet is 10.</div>
        )}
      </div>

      <div
        className={
          errors?.firsName ||
          errors?.lastName ||
          errors?.themeName ||
          errors?.age ||
          errors?.commnet
            ? styles.inputSubmitError
            : styles.inputSubmitWrap
        }>
        <input type="submit" value={title} className={styles.inputSubmit} />
      </div>
    </form>
  );
};

export { AddForm };
