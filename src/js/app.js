import state from './controller/stateController.js';
import validateUrlAndDuplicates from './model/validation/validateUrlAndDuplicates.js';
import handleRssValidation from './model/validation/validationRss.js';
import fetchRssFeed from './model/fetchRssFeed.js';
import parseRss from './model/parser.js';
import proccessData from './model/proccessData.js';
import checkForNewPosts from './model/checkForNewPosts.js';

const handleValidationError = (validationError) => {
  console.error('validation error', validationError);
  const { error } = validationError.error;
  state.validationState.error = error || 'GENERAL_ERROR';
  state.validationState.status = 'invalid';
};

const handleFetchError = (fetchError) => {
  console.error('fetch error', fetchError);
  const { error } = fetchError;
  state.rssProcess.error = error;
  state.rssProcess.state = 'error';
};

const runApp = () => {
  const form = document.querySelector('.rss-form');
  const inputField = form.querySelector('#url-input');

  const preValidationState = {
    error: '',
    status: '',
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    state.validationState = { ...preValidationState };
    state.rssProcess.state = 'initial';
    state.rssProcess.input = inputField.value;

    validateUrlAndDuplicates(state.rssProcess.input, state.rssProcess.feedList)
      .then((validationState) => {
        if (validationState.status === 'valid') {
          fetchRssFeed(state.rssProcess.input)
            .then((result) => {
              if (result.status === 'success') {
                return parseRss(result.data);
              }
              return Promise.reject(result);
            })
            .then((doc) => {
              const rssValidation = handleRssValidation(doc);

              state.validationState.error = rssValidation.error;
              state.validationState.status = rssValidation.status;

              if (rssValidation && rssValidation.status === 'valid') {
                const feeds = state.rssProcess.feedList;
                const posts = state.rssProcess.postsList;
                const url = state.rssProcess.input;

                const data = proccessData(
                  rssValidation.data,
                  feeds,
                  posts,
                  url,
                );

                state.rssProcess.feedList.unshift(data.newFeed);
                state.rssProcess.postsList.unshift(...data.newPosts);
                state.rssProcess.state = 'success';

                checkForNewPosts(state.rssProcess.updateTimeout);
              } else {
                state.rssProcess.error = rssValidation.error;
                state.rssProcess.state = 'error';
              }
            })
            .catch((fetchError) => {
              handleFetchError(fetchError);
            });
        } else {
          state.validationState.error = validationState.error;
          state.validationState.status = validationState.status;
        }
      })
      .catch((validationError) => {
        handleValidationError(validationError);
      });
  });
};

export default runApp;
