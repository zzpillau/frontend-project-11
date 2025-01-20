import i18next from 'i18next';
import resources from './locales.js';

let i18nPromise = null;

const getInstanceI18n = () => {
  if (!i18nPromise) {
    i18nPromise = new Promise((resolve, reject) => {
      const i18nInstance = i18next.createInstance();

      console.log('Initializing i18n instance...');

      i18nInstance.init(
        {
          lng: 'ru',
          fallbackLng: 'en',
          debug: true,
          resources,
        },
        (err) => {
          if (err) {
            console.error('Error during i18n initialization:', err);
            reject(err);
          } else {
            console.log('i18n instance successfully initialized:', i18nInstance);
            resolve(i18nInstance);
          }
        },
      );
    });
  }
  return i18nPromise;
};

export default getInstanceI18n;
