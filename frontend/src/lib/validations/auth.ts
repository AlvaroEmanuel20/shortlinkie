import * as yup from 'yup';

export const loginSchema = yup
  .object({
    email: yup.string().email('Email inválido').required('Campo obrigatório'),
    password: yup
      .string()
      .min(8, 'No mínimo 8 caracteres')
      .required('Campo obrigatório'),
  })
  .required();

export const signUpSchema = yup
  .object({
    name: yup
      .string()
      .min(2, 'No mínimo 2 caracteres')
      .required('Campo obrigatório'),
    email: yup.string().email('Email inválido').required('Campo obrigatório'),
    password: yup
      .string()
      .min(8, 'No mínimo 8 caracteres')
      .required('Campo obrigatório'),
  })
  .required();
