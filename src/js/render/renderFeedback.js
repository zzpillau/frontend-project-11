import { getInstanceI18n } from "../i18n/i18nConfig.js";

export const renderFeedback = (validationState) => {
  const { status, error } = validationState;

  const feedbackOutput = document.querySelector('.feedback');
  feedbackOutput.textContent = '';
  const urlInput = document.querySelector('#url-input');

  const form = document.querySelector('.rss-form');
  
let i18nPromise = getInstanceI18n()

i18nPromise
    .then((i18n) => {
      switch(status) {
        case 'valid':
          feedbackOutput.textContent = i18n.t('feedback.success');
          feedbackOutput.classList.remove('text-danger');
          urlInput.classList.remove('is-invalid');
          feedbackOutput.classList.add('text-success');
          form.reset();
          urlInput.focus();
          break;
        case 'invalid':
          urlInput.classList.add('is-invalid');
          feedbackOutput.textContent = error;
          feedbackOutput.classList.remove('text-success');
          feedbackOutput.classList.add('text-danger');
          urlInput.select();
          break;
        default:
          throw new Error('renderFeedback: Status Error');
      }
    })
    .catch((e) => console.log('renderFeedback error', e));
};
