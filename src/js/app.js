import { initState } from './init/initState.js';
import { watchState } from './view/view.js';
import { validateUrl } from './validation/validation.js';
import { handleRssValidation } from './validation/validationRss.js';
import { fetchRssFeed } from './fetchRssFeed.js';
import { parseRss } from './parser.js';
import { proccessData } from './proccessData.js';

export const runApp = () => {
  const form = document.querySelector('.rss-form');
  const inputField = form.querySelector('#url-input');
  const watchedState = watchState(initState);

  const preValidationState = {
    error: '',
    status: '',
  };


  form.addEventListener('submit', (event) => {
    console.log('addEventListener start');
    event.preventDefault();

    watchedState.validationState = { ...preValidationState };
    watchedState.rssProcess.state = 'initial';

    watchedState.rssProcess.input = inputField.value;

    validateUrl(watchedState.rssProcess.input, watchedState.rssProcess.feedList)
      .then((validationState) => {
        if (validationState.status === 'valid') {
          fetchRssFeed(watchedState.rssProcess.input)
            .then((result) => {
              if (result.status === 'success') {
                return parseRss(result.data);
              } else {
                return Promise.reject(result);
              }
            })
            .then((doc) => {
              const rssValidation = handleRssValidation(doc);
              watchedState.validationState.error = rssValidation.error;
              watchedState.validationState.status = rssValidation.status;

              if (rssValidation && rssValidation.status === 'valid') {
                const feeds = watchedState.rssProcess.feedList;
                const posts = watchedState.rssProcess.postsList;
                const url = watchedState.rssProcess.input;
                const processedData = proccessData(
                  rssValidation.data,
                  feeds,
                  posts,
                  url,
                ); // FEED

                watchedState.rssProcess.feedList.push(processedData.newFeed);
                watchedState.rssProcess.postsList.push(
                  ...processedData.newPosts,
                );
                watchedState.rssProcess.state = 'success';
              } else {
                watchedState.rssProcess.error = rssValidation.error;
                watchedState.rssProcess.state = 'error';
              }

            })
            .catch((errorCode) => {
              console.log(errorCode, 'errorCode');
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
        console.log(error, 'error.error || GENERAL_ERROR');

        watchedState.validationState.error = error.error || 'GENERAL_ERROR';
        watchedState.validationState.status = 'invalid';
      });
  });
};

