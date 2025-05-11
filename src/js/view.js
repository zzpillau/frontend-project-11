import onChange from 'on-change'
import renderFeedback from './renders/renderFeedback.js'
import { renderPosts, renderFeeds } from './renders/renders.js'
import renderModal from './renders/renderModal.js'
import { disableSubmitButton, enableSubmitButton } from './renders/toggleSubmitButton.js'

const watchState = (initState, elements, i18n) => {
  const watchedState = onChange(initState, (path, value) => {
    switch (path) {
      case 'form.state':
        if (value === 'idle' || value === 'error') {
          enableSubmitButton(elements)
        }
        else {
          disableSubmitButton(elements)
        }
        break
      case 'form.validationState.status':
        renderFeedback(initState, elements, i18n)
        break
      case 'rssProcess.state':
        if (value === 'success') {
          renderFeeds(initState, elements, i18n)
          renderPosts(initState, elements, i18n)
        }
        break
      case 'rssProcess.updateState':
        if (value === 'success') {
          renderPosts(initState, elements, i18n)
        }
        break
      case 'modal.state':
        if (value === 'open') {
          renderModal(initState, elements, i18n)
        }
        break
      default:
        break
    }
  })

  return watchedState
}

export default watchState
