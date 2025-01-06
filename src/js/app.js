import { initState } from './init/initState.js';
import { watchState } from './view.js';
import { validateUrl } from './validation.js';
import { checkForDuplicateFeeds } from './checkForDuplicateFeeds.js';
import { createI18nInstance } from './i18n/i18nConfig.js';

export const runApp = () => {
  const form = document.querySelector('.rss-form');
  const inputField = form.querySelector('#url-input');
  const watchedState = watchState(initState);
  // console.log(watchedState, 'watchedState')

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    watchedState.rssProcess.input = inputField.value;

    // console.log('watchedState.validationState', watchedState.validationState)

    validateUrl(watchedState.rssProcess.input)
      .then((validationState) => {
        // console.log(validationState, 'validationState')

        if (
          !checkForDuplicateFeeds(
            watchedState.rssProcess.feedList,
            watchedState.rssProcess.input,
          )
        ) {
          watchedState.validationState.error = validationState.error;
          watchedState.validationState.status = validationState.status;
        } else {
          watchedState.validationState.status = 'invalid';
          createI18nInstance().then((i18n) => {
            watchedState.validationState.error = i18n.t(
              'feedback.duplicateError',
            );
          });
        }
      })
      .catch((e) => console.log('we got big error', e));
  });
};
