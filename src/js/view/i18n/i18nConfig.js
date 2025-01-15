import i18next from 'i18next';
import resources from './locales.js';

let i18nPromise = null;

const getInstanceI18n = () => {
  if (!i18nPromise) {
    i18nPromise = new Promise((resolve, reject) => {
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
  }
  return i18nPromise;
};

export default getInstanceI18n;
