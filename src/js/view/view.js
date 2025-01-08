import onChange from 'on-change';
import { renderFeedback } from './renderFeedback.js';

// all renders

export const watchState = (initState) => {
  const watchedState = onChange(initState, (path, value, prevValue) => {
    switch (path) {
      case 'validationState.status':
        // if (prevValue === '') {
        renderFeedback(initState.validationState);
        // }
        break;
      case 'rssProcess.state':
        if(value === 'error') {
          renderFeedback({status: 'invalid', error: initState.rssProcess.error})
        }
        break;
    }
  });

  return watchedState;
};
