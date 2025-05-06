import { Modal } from 'bootstrap'
// import { generateModalConfig } from '../htmlConfigs/generateModalConfig.js';
// import HTMLBuilder from '../../builders/HTMLBuilder.js';

const renderModal = (modalContent, i18n) => {
  const {
    id, title, description, url,
  } = modalContent

  // const rootContainer = document.querySelector('.modal-dialog');
  // rootContainer.innerHTML = '';

  // const modalConfig = generateModalConfig(title, description, url, i18n);
  // new HTMLBuilder(modalConfig).render(rootContainer);

  const modalTitle = document.querySelector('.modal-title')
  modalTitle.textContent = title

  const modalBody = document.querySelector('.modal-body')
  modalBody.textContent = description

  const btnPrimary = document.querySelector('.modal-footer .btn-primary')
  btnPrimary.setAttribute('href', url)
  btnPrimary.textContent = i18n.t('buttons.read')

  const btnSecondary = document.querySelector('.modal-footer .btn-secondary')
  btnSecondary.textContent = i18n.t('buttons.close')

  const modal = document.querySelector('#modal')
  const modalInstande = new Modal(modal)
  modalInstande.show()

  const currentPostElement = document.querySelector(`[data-id="${id}"]`)

  currentPostElement.classList.remove('fw-bold')
  currentPostElement.classList.add('fw-normal', 'link-secondary')
}

export default renderModal
