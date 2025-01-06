import { initialRender } from './initialRender.js';
import { getInstanceI18n } from '../i18n/i18nConfig.js';

export const initApp = () => {
  getInstanceI18n()
    .then((i18n) => {
      const rootContainer = document.body;
      rootContainer.classList.add('d-flex', 'flex-column', 'min-vh-100');

      initialRender(rootContainer, i18n);
    })
    .catch((e) => {
      console.error('Error initializing i18n:', e);
    });
};
