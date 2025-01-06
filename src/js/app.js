import { initState } from './init/initState.js';
import { watchState } from './view.js';
import { validateUrl } from './validation.js';

export const runApp = () => {
  const form = document.querySelector('.rss-form');
  const inputField = form.querySelector('#url-input');
  const watchedState = watchState(initState);

  const preValidationState = {
    error: '',
    status: '',
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    watchedState.validationState = {...preValidationState};

    watchedState.rssProcess.input = inputField.value;

    validateUrl(watchedState.rssProcess.input, watchedState.rssProcess.feedList)
      .then((validationState) => {
        watchedState.validationState.error = validationState.error;
        watchedState.validationState.status = validationState.status;
        if(watchedState.validationState.status === 'valid') {
          watchedState.rssProcess.feedList.push({url: watchedState.rssProcess.input})
        }
        console.log('watchedState.validationState.error', watchedState.validationState.error)
      })
      .catch((e) => console.log('we got a big app error', e));
    })
  }
