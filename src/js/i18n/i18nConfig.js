import i18next from 'i18next';
import { resources } from './texts/index.js';

export const createI18nInstance = () => {
  return new Promise((resolve, reject) => {
    const i18nInstance = i18next.createInstance();
    i18nInstance.init(
      {
        lng: 'ru',
        fallbackLng: 'en',
        debug: true,
        resources,
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(i18nInstance);
        }
      },
    );
  });
};
