import * as yup from 'yup';

export const addShorturlSchema = yup
  .object({
    title: yup.string().required('Campo obrigatório'),
    src: yup.string(),
    originalUrl: yup.string().url('Url inválida').required('Campo obrigatório'),
  })
  .required();

export const editShorturlSchema = yup
  .object({
    title: yup.string().min(2, 'No mínimo 2 caracteres'),
    originalUrl: yup.string().url('Url inválida'),
    src: yup.string(),
    shortId: yup.string().min(2, 'No mínimo 2 caracteres'),
  })
  .required();
