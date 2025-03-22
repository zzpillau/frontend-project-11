import onChange from 'on-change';
import handlePostClick from '../controller/eventHandlers.js';
import renderFeedback from './renders/renderFeedback.js';
import renderRss from './renders/renderRss.js';
import renderNewPosts from './renders/renderNewPosts.js';
import renderModal from './renders/renderModal.js';
import { disableSubmitButton, enableSubmitButton } from './renders/toggleSubmitButton.js';

const handleValidationState = (initState) => {
  renderFeedback(initState.validationState);
};

const handleRssProcessState = (initState, value, handleClick) => {
  if (value === 'error') {
    const feedbackState = initState.rssProcess.error === 'NETWORK_ERROR'
      ? { status: 'invalid', error: initState.rssProcess.error }
      : initState.validationState;
    renderFeedback(feedbackState);
  } else if (value === 'success') {
    renderRss(initState, handleClick);
  } else if (value === 'sending') {
    disableSubmitButton();
    return;
  }
  enableSubmitButton();
};

const handleUpdateState = (initState, value, handleClick) => {
  if (value === 'updateSuccess') {
    console.log('renderNewPosts must start');
    renderNewPosts(initState, handleClick);
  }
};

const handleModalState = (initState, value) => {
  if (value === 'open') {
    renderModal(initState);
  }
};

const watchState = (initState) => {
  const watchedState = onChange(initState, (path, value) => {
    const handleClick = handlePostClick(watchedState);

    switch (path) {
      case 'validationState.status':
        handleValidationState(initState);
        break;
      case 'rssProcess.state':
        handleRssProcessState(initState, value, handleClick);
        break;
      case 'rssProcess.updateState':
        console.log('rssProcess.updateState value', value);
        handleUpdateState(initState, value, handleClick);
        break;
      case 'modal.state':
        handleModalState(initState, value);
        break;
      default:
        break;
    }
  });

  return watchedState;
};

export default watchState;
