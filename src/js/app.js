import { initState } from './init/initState.js';
import { watchState } from './view.js';
import { validateUrl } from './validation.js';

export const runApp = () => {
  const form = document.querySelector('.rss-form');
  const inputField = form.querySelector('#url-input');
  const watchedState = watchState(initState);
  console.log(watchedState, 'watchedState')


  form.addEventListener('submit', (event) => {
    event.preventDefault();

    watchedState.rssProcess.input = inputField.value;

    console.log('watchedState.validationState', watchedState.validationState)

    validateUrl(watchedState.rssProcess.input)
      .then((validationState) => {
        console.log(validationState, 'validationState')
        watchedState.validationState.error = validationState.error;
        watchedState.validationState.status = validationState.status;
        console.log(watchedState.validationState.error, 'watchedState.validationState.error')

        console.log(watchedState.validationState.error, 'watchedState.validationState.error')
        
        // if(error.length > 0) {
        //   console.log(watchedState.validationState.error, 'validationState.error');
        // }


      })
      .catch(console.log)
  })
}
