import { Modal } from 'bootstrap'

const renderModal = (modalContent, i18n) => {
  const {
    id, title, description, url,
  } = modalContent

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
  const modalInstance = new Modal(modal)
  modalInstance.show()

  const currentPostElement = document.querySelector(`[data-id="${id}"]`)

  currentPostElement.classList.remove('fw-bold')
  currentPostElement.classList.add('fw-normal', 'link-secondary')
}

export default renderModal
