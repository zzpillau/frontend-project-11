import { initialRender } from './initialRender.js';
import { createI18nInstance } from '../i18n/i18nConfig.js';

export const initApp = () => {
  createI18nInstance()
    .then((i18n) => {
      const rootContainer = document.body;
      rootContainer.classList.add('d-flex', 'flex-column', 'min-vh-100');

      initialRender(rootContainer, i18n);
    })
    .catch((e) => {
      console.error('Error initializing i18n:', e);
    });
};
