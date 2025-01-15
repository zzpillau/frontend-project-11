import {Modal} from 'bootstrap';
import {generateModalConfig} from '../htmlConfigs/generateModalConfig.js';
import getInstanceI18n from '../i18n/i18nConfig.js';
import HTMLBuilder from '../../builders/HTMLBuilder.js';

const renderModal = (state) => {
  getInstanceI18n()
    .then((i18n) => {
      const {
        modal: {
          content: {title, description, url},
          currentPostLink
        }
      } = state;

      currentPostLink.classList.remove('fw-bold');
      currentPostLink.classList.add('fw-normal', 'link-secondary');

      const rootContainer = document.querySelector('.modal-dialog');
      rootContainer.innerHTML = '';

      const modalConfig = generateModalConfig(title, description, url, i18n);
      new HTMLBuilder(modalConfig).render(rootContainer);

      const modal = document.querySelector('#modal');
      const modalInstande = new Modal(modal);
      modalInstande.show();

      state.modal.content = null;
      state.modal.state = 'idle';
    })
    .catch((err) => {
      console.error('Error getting i18n instance:', err);
    });
};

export default renderModal;
