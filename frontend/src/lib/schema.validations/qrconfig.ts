import * as yup from 'yup';

export const editQrconfigSchema = yup
  .object({
    color: yup.string().min(2, 'No mínimo 2 caracteres'),
    size: yup
      .number()
      .typeError('Tamanho deve ser um número')
      .integer('Valor inválido')
      .min(128, 'Valor mínimo é 128'),
  })
  .required();
