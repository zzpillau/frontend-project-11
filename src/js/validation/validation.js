import * as yup from 'yup';
import { checkForDuplicateFeeds } from './checkForDuplicateFeeds.js'; 

// инициализация схемы yup
const initializeValidationSchema = () => {
  yup.setLocale({
    string: {
      url: 'INVALID_URL',
    }
  })
  return yup.object({
    url: yup
      .string()
      .url()
      .required()
  });
};

// валидация урл
export const validateUrl = (input, feedList) => {
  const validationState = {
    error: '',
    status: '',
  };

  const schema = initializeValidationSchema();

  return schema.validate({ url: input })
    .then(() => {
    // проверка на дубликаты фидов
      if(!checkForDuplicateFeeds(feedList, {url: input})) {
        validationState.status = 'valid';
        validationState.error = 'SUCCESS';
      } else {
        validationState.status = 'invalid';
        validationState.error = 'DUPLICATE_ERROR';
      }
      return validationState;
      })
  .catch((e) => {
    validationState.status = 'invalid';

    if (e.errors) {
      const {errors: [error]}  = e;
      validationState.error = error;
    } else {
      validationState.error = 'GENERAL_ERROR';
    }

    return validationState;
  });
};
