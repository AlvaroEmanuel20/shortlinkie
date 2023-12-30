import * as yup from 'yup';

export const editUserSchema = yup
  .object({
    name: yup.string().min(2, 'No mínimo 2 caracteres'),
    email: yup.string().email('Email inválido'),
  })
  .required();

export const editPasswordSchema = yup
  .object({
    password: yup.string().min(8, 'No mínimo 8 caracteres'),
    newPassword: yup.string().min(8, 'No mínimo 8 caracteres'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Senhas devem ser iguais'),
  })
  .required();
