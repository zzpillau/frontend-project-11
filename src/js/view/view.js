import onChange from 'on-change'
import handlePostClick from '../controller/eventHandlers.js'
import renderFeedback from './renders/renderFeedback.js'
import renderRss from './renders/renderRss.js'
import renderNewPosts from './renders/renderNewPosts.js'
import renderModal from './renders/renderModal.js'
import { disableSubmitButton, enableSubmitButton } from './renders/toggleSubmitButton.js'

const handleRssProcessState = (initState, value, handleClick) => {
  if (value === 'error') {
    const feedbackState = initState.rssProcess.error === 'NETWORK_ERROR'
      ? { status: 'invalid', error: initState.rssProcess.error }
      : initState.form.validationState

    renderFeedback(feedbackState)
  }
  else if (value === 'success') {
    renderRss(initState, handleClick)
  }
}

const watchState = (initState, i18n) => {
  const watchedState = onChange(initState, (path, value) => {
    const handleClick = handlePostClick(watchedState)

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
        handleRssProcessState(initState, value, handleClick)
        break
      case 'rssProcess.updateState':
        if (value === 'success') {
          renderNewPosts(initState, handleClick)
        }
        break
      case 'modal.state':
        if (value === 'open') {
          console.log('VIEW initState.modal.content', initState.modal)
          renderModal(initState.modal.content, i18n) // + i18n
        }
        break
      default:
        break
    }
  })

  return watchedState
}

export default watchState
