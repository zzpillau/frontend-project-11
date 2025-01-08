import { initState } from './init/initState.js';
import { watchState } from './view/view.js';
import { validateUrl } from './validation/validation.js';
import { handleRssValidation } from './validation/validationRss.js';
import { fetchRssFeed } from './fetchRssFeed.js';
import { parseRss } from './parser.js';
import {proccessData} from './proccessData.js'


export const runApp = () => {
  const form = document.querySelector('.rss-form');
  const inputField = form.querySelector('#url-input');
  const watchedState = watchState(initState);

  const preValidationState = {
    error: '',
    status: '',
  }

  form.addEventListener('submit', (event) => {
    console.log('addEventListener start')
    event.preventDefault();
    
    watchedState.validationState = {...preValidationState};

    watchedState.rssProcess.input = inputField.value;

    validateUrl(watchedState.rssProcess.input, watchedState.rssProcess.feedList)
      .then((validationState) => {
        if (validationState.status === 'valid'){
          fetchRssFeed(watchedState.rssProcess.input)
            .then((data) => parseRss(data))
            .then((doc) => {   
              const result = handleRssValidation(doc);
              watchedState.validationState.error = result.error;
              watchedState.validationState.status = result.status;
              if (result && result.status === 'valid') {
                watchedState.rssProcess.feedList.push(
                  {url: watchedState.rssProcess.input}
                );
                return proccessData(result.data) // FEED
              }
            })
            .catch((errorCode) => {
              console.log(errorCode, 'errorCode')
              const { error } = errorCode;
              watchedState.rssProcess.error = error;
              watchedState.rssProcess.state = 'error';
            });
          } else {
            watchedState.validationState.error = validationState.error;
            watchedState.validationState.status = validationState.status;
          }
      })
      .catch((error) => {
        console.log(error, 'error.error || GENERAL_ERROR')

        watchedState.validationState.error = error.error || 'GENERAL_ERROR';
        watchedState.validationState.status = 'invalid';
      });
  });
};
  


