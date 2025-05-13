import onChange from 'on-change'
import renderForm from './renders/renderForm.js'
import renderFeeds from './renders/renderFeeds.js'
import renderPosts from './renders/renderPosts.js'
import renderModal from './renders/renderModal.js'

const watchState = (state, elements, i18n) => {
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'form.state':
        if (value === 'validating') {
          elements.submitButton.disabled = true
        }
        if (value === 'error') {
          renderForm(state, elements, i18n)
        }
        break
      case 'rss.state':
        if (value === 'success') {
          renderFeeds(state, elements, i18n)
          renderPosts(state, elements, i18n)
          renderForm(state, elements, i18n)
        }
        if (value === 'error') {
          renderForm(state, elements, i18n)
        }
        if (value === 'updated') {
          renderPosts(state, elements, i18n)
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
