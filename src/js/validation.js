import * as yup from 'yup';

const validationSchema = yup.object({
  url: yup
    .string()
    .url('invalidUrl')
    .required()
    // TO-DO убрать заглушку, сделать нормально 
    .matches(/(rss|xml)/, 'invalidRss'), 
});

export const validateUrl = (input) => {
  const validationState = {
    error: '',
    status: 'invalid',
  };

  return validationSchema
    .validate({ url: input })
    .then(() => {
      validationState.status = 'valid';
      return validationState;
    })
    .catch((e) => {
      validationState.status = 'invalid';
      const {errors: [error]}  = e;
      console.log(error, 'error')

      validationState.error = error;

      return validationState;
    });
};
