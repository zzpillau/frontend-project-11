import onChange from 'on-change';
import handlePostClick from '../../controller/eventHandlers.js';
import renderFeedback from './renders/renderFeedback.js';
import renderRss from './renders/renderRss.js';
import renderNewPosts from './renders/renderNewPosts.js';
import renderModal from './renders/renderModal.js';

const watchState = (initState) => {
  const watchedState = onChange(initState, (path, value) => {
    switch (path) {
      case 'validationState.status':
        renderFeedback(initState.validationState);
        break;
      case 'rssProcess.state':
        if (value === 'error') {
          renderFeedback({
            status: 'invalid',
            error: initState.rssProcess.error,
          });
        }
        if (value === 'success') {
          renderRss(initState.rssProcess, handlePostClick);
        }
        break;
      case 'rssProcess.updateState':
        if (value === 'updateSuccess') {
          renderNewPosts(initState, handlePostClick);
        }
        break;
      case 'modal.state':
        if (value === 'open') {
          renderModal(initState);
        }
        break;
      default:
        throw new Error(`Unknown state path: ${path}`)
    }
  });

  return watchedState;
};

export default watchState;