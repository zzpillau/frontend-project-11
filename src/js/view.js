import onChange from 'on-change'
import renderFeedback from './renders/renderFeedback.js'
import renderRss from './renders/renderRss.js'
import renderModal from './renders/renderModal.js'
import { disableSubmitButton, enableSubmitButton } from './renders/toggleSubmitButton.js'

const watchState = (initState, i18n) => {
  const watchedState = onChange(initState, (path, value) => {
    switch (path) {
      case 'form.state':
        if (value === 'idle' || value === 'error') {
          enableSubmitButton()
        }
        else {
          disableSubmitButton()
        }
        break
      case 'form.validationState.status':
        renderFeedback(initState.form.validationState)
        break
      case 'rssProcess.state':
        if (value === 'success') {
          renderRss(initState, i18n)
        }
        break
      case 'rssProcess.updateState':
        if (value === 'success') {
          renderRss(initState, i18n, 'posts')
        }
        break
      case 'modal.state':
        if (value === 'open') {
          renderModal(initState.modal.content, i18n)
        }
        break
      default:
        break
    }
  })

  return watchedState
}

export default watchState
