import * as yup from 'yup';

export const addLinkSchema = yup
  .object({
    title: yup
      .string()
      .min(2, 'No mínimo 2 caracteres')
      .required('Campo obrigatório'),
    originalUrl: yup.string().url('Url inválida').required('Campo obrigatório'),
  })
  .required();
