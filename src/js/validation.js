import * as yup from 'yup';
import { getInstanceI18n } from './i18n/i18nConfig.js';
import { checkForDuplicateFeeds } from './checkForDuplicateFeeds.js'; 

const i18nPromise = getInstanceI18n();

let validationSchema;

i18nPromise
  .then((i18n) => {
    yup.setLocale({
      string: {
        url: i18n.t('feedback.invalidUrl'),
        matches: i18n.t('feedback.invalidRss')
      }
    })

    validationSchema = yup.object({
      url: yup
        .string()
        .url()
        .required()
        // TO-DO убрать заглушку, сделать нормально 
        .matches(/(rss|xml)/), 
    });

  })
  .catch((e) => {
    console.error('setLocale error:', e)
  });



export const validateUrl = (input, feedList) => {
  const validationState = {
    error: '',
    status: 'invalid',
  };

  return validationSchema
    .validate({ url: input })
    .then(() => {
      i18nPromise
       .then((i18n) => {
        if(!checkForDuplicateFeeds(feedList, {url: input})) {
          validationState.status = 'valid';
          validationState.error = i18n.t('feedback.success')
        } else {
          validationState.status = 'invalid';
          validationState.error = i18n.t('feedback.duplicateError');
        }
       })
        .catch((e) => {
          console.error('duplicate success error', e);
        })
      return validationState;
    })
    .catch((e) => {
      validationState.status = 'invalid';

      const {errors: [error]}  = e;

      validationState.error = error;

      return validationState;
    });
};
