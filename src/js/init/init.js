import initialRender from '../view/renders/initialRender.js';
import getInstanceI18n from '../view/i18n/i18nConfig.js';

const initApp = () => {
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

export default initApp;