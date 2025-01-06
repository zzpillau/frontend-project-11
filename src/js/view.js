import onChange from 'on-change';
import { renderFeedback } from './render/renderFeedback.js';

// all renders

export const watchState = (initState) => {
  const watchedState = onChange(initState, (path, value, prevValue) => {
    switch (path) {
      case 'validationState.status':
        renderFeedback(initState.validationState);
    }
  });

  return watchedState;
};
