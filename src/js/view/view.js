import onChange from 'on-change';
import { renderFeedback } from './renderFeedback.js';
import { renderFeed } from './renderFeed.js';

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
          renderFeed(initState.rssProcess);
        }
        break;
    }
  });

  return watchedState;
};
