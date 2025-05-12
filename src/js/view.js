import onChange from 'on-change'
import renderForm from './renders/renderForm.js'
import { renderPosts, renderFeeds } from './renders/renders.js'
import renderModal from './renders/renderModal.js'

const watchState = (state, elements, i18n) => {
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'form.validationState.status':
        renderForm(state, elements, i18n)
        break
      case 'rss.state':
        if (value === 'success') {
          renderFeeds(state, elements, i18n)
          renderPosts(state, elements, i18n)
        }
        if (value === 'updated') {
          renderPosts(state, elements, i18n)
        }
        if (value === 'submitting') {
          elements.submitButton.disabled = true
        }
        break
      case 'modal.state':
        if (value === 'open') {
          renderModal(state, elements, i18n)
        }
        break
      default:
        break
    }
  })

  return watchedState
}

export default watchState
