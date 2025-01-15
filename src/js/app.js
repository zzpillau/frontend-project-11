import watchedState from './view/view.js';
import validateUrl from './model/validation/validation.js';
import handleRssValidation from './model/validation/validationRss.js';
import fetchRssFeed from './model/fetchRssFeed.js';
import parseRss from './model/parser.js';
import proccessData from './model/proccessData.js';
import checkForNewPosts from './model/checkForNewPosts.js';

const runApp = () => {
  const form = document.querySelector('.rss-form');
  const inputField = form.querySelector('#url-input');

  const preValidationState = {
    error: '',
    status: '',
  };

  form.addEventListener('submit', (event) => {
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
              }
              return Promise.reject(result);
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
                );

                watchedState.rssProcess.feedList.push(processedData.newFeed);
                watchedState.rssProcess.postsList.push(...processedData.newPosts);
                watchedState.rssProcess.state = 'success';

                checkForNewPosts(watchedState.rssProcess.updateTimeout);
              } else {
                watchedState.rssProcess.error = rssValidation.error;
                watchedState.rssProcess.state = 'error';
              }
            })
            .catch((errorCode) => {
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
        console.error(error, 'error.error || GENERAL_ERROR');

        watchedState.validationState.error = error.error || 'GENERAL_ERROR';
        watchedState.validationState.status = 'invalid';
      });
  });
};

export default runApp;
