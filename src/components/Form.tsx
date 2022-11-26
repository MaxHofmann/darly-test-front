import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
}

interface IFormInputs {
  email: string;
  password: string;
}

const Form: React.FC<FormProps> = ({ title, handleClick }) => {
  const onSubmit: SubmitHandler<IFormInputs> = (data) => handleClick(data.email, data.password);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true, pattern: /.+@.+/, minLength: 6 })} />
      {errors?.email?.type === 'required' && <div>Email is required.</div>}
      {errors?.password?.type === 'minLength' && <div>Min length password is 6.</div>}
      {errors?.email?.type === 'pattern' && <div>Email should be in xxx@yyy.zzz format</div>}

      <input {...register('password', { required: true, maxLength: 18, minLength: 8 })} />
      {errors?.password?.type === 'required' && <div>Password is required.</div>}
      {errors?.password?.type === 'maxLength' && <div>Max length password is 18.</div>}
      {errors?.password?.type === 'minLength' && <div>Min length password is 8.</div>}

      <input type="submit" value={title} />
    </form>
  );
};

export { Form };
