
import onChange from 'on-change';
import handlePostClick from '../controller/eventHandlers.js';
import renderFeedback from './renders/renderFeedback.js';
import renderRss from './renders/renderRss.js';
import renderNewPosts from './renders/renderNewPosts.js';
import renderModal from './renders/renderModal.js';

const watchState = (initState) => {
  const watchedState = onChange(initState, (path, value) => {
    const handleClick = handlePostClick(watchedState);

    switch (path) {
    case 'validationState.status':
      renderFeedback(initState.validationState);
      break;
    case 'rssProcess.state':
      if (value === 'error') {
        renderFeedback({
          status: 'invalid',
          error: initState.rssProcess.error
        });
      }
      if (value === 'success') {
        renderRss(initState, handleClick);
      }
      break;
    case 'rssProcess.updateState':
      if (value === 'updateSuccess') {
        renderNewPosts(initState, handleClick);
      }
      break;
    case 'modal.state':
      if (value === 'open') {
        renderModal(initState);
      }
      break;
    default:
      console.log('I want to ignore this path', path);
    }
  });

  return watchedState;
};

export default watchState;
