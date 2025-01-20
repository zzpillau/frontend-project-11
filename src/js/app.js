import state from './controller/stateController.js';
import validateUrlAndDuplicates from './model/validation/validateUrlAndDuplicates.js';
import handleRssValidation from './model/validation/validationRss.js';
import proccessData from './model/proccessData.js';
import checkForNewPosts from './model/checkForNewPosts.js';
import fetchAndParse from './model/fetchAndParse.js';

const handleValidationError = (validationError) => {
  console.error('handleValidationError', validationError);
  state.validationState.error = validationError.error || 'GENERAL_ERROR';
  state.validationState.status = 'invalid';
};

const handleFetchError = (fetchError) => {
  console.error('handleFetchError', fetchError);
  state.rssProcess.error = fetchError.error;
  state.rssProcess.state = 'error';
};

const processRssData = (doc) => {
  const rssValidation = handleRssValidation(doc);

  if (rssValidation && rssValidation.status === 'valid') {
    state.validationState.error = rssValidation.error;
    state.validationState.status = rssValidation.status;

    const feeds = state.rssProcess.feedList;
    const posts = state.rssProcess.postsList;
    const url = state.rssProcess.input;

    const data = proccessData(rssValidation.data, feeds, posts, url);

    state.rssProcess.feedList.unshift(data.newFeed);
    state.rssProcess.postsList.unshift(...data.newPosts);
    state.rssProcess.state = 'success';
  }
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
    state.rssProcess.error = '';

    validateUrlAndDuplicates(state.rssProcess.input, state.rssProcess.feedList)
      .then((validationState) => {
        if (validationState.status === 'valid') {
          return fetchAndParse(state.rssProcess.input);
        }
        state.validationState.error = validationState.error;
        state.validationState.status = validationState.status;

        return Promise.reject(validationState);
      })
      .then((doc) => {
        processRssData(doc);
        checkForNewPosts(state);
      })
      .catch((error) => {
        if (error.status === 'invalid') {
          handleValidationError(error);
        }
        if (error.status === 'error') {
          handleFetchError(error);
        }
      });
  });
};

export default runApp;
