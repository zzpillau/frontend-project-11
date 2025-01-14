import onChange from 'on-change';
import { renderFeedback } from './renderFeedback.js';
import { renderRss } from './renderRss.js';
import { renderNewPosts } from './renderNewPosts.js';
import { renderModal } from './renderModal.js';

// all renders

export const watchState = (initState) => {
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
          renderRss(initState.rssProcess);
        }
        break;
      case 'rssProcess.updateState':
        if (value === 'updateSuccess') {
          renderNewPosts(initState);
        }
        break;

      case 'modal.state':
        if (value === 'open') {
          renderModal(initState);
        }
    }
  });

  return watchedState;
};
