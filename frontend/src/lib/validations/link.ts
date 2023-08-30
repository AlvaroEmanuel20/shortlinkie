import * as yup from 'yup';

export const addLinkSchema = yup
  .object({
    title: yup.string().required('Campo obrigatório'),
    originalUrl: yup.string().url('Url inválida').required('Campo obrigatório'),
  })
  .required();

export const editLinkSchema = yup
  .object({
    title: yup.string().min(2, 'No mínimo 2 caracteres'),
    originalUrl: yup.string().url('Url inválida'),
    shortId: yup.string().min(2, 'No mínimo 2 caracteres'),
  })
  .required();
