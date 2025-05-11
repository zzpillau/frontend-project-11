import { Modal } from 'bootstrap'

const renderModal = (state, elements, i18n) => {
  const {
    id, title, description, url,
  } = state.modal.content

  const {
    modal,
    modalTitle,
    modalBody,
    btnPrimary,
    btnSecondary,
    currentPostElement,
  } = elements

  modalTitle.textContent = title

  modalBody.textContent = description

  btnPrimary.setAttribute('href', url)
  btnPrimary.textContent = i18n.t('buttons.read')

  btnSecondary.textContent = i18n.t('buttons.close')

  const modalInstance = new Modal(modal)
  modalInstance.show()

  const postEl = currentPostElement(id)

  postEl.classList.remove('fw-bold')
  postEl.classList.add('fw-normal', 'link-secondary')
}

export default renderModal
