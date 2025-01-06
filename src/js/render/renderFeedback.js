import { createI18nInstance } from "../i18n/i18nConfig.js";

export const renderFeedback = (validationState) => {
  const { status, error } = validationState;

  const feedbackOutput = document.querySelector('.feedback');
  const urlInput = document.querySelector('#url-input');

  const form = document.querySelector('.rss-form');
  
  createI18nInstance()
    .then((i18n) => {
      switch(status) {
        case 'valid':        
          feedbackOutput.textContent = i18n.t('feedback.success');
          feedbackOutput.classList.remove('text-danger');
          feedbackOutput.classList.add('text-success');
          form.reset();
          urlInput.focus();
          break;
        case 'invalid':
          urlInput.classList.add('is-invalid');
          feedbackOutput.textContent = i18n.t(`feedback.${error}`);
          feedbackOutput.classList.remove('text-success');
          feedbackOutput.classList.add('text-danger');
          break;
        default:
          throw new Error('renderFeedback: Status Error');
      }
    })
    .catch((e) => console.log('renderFeedback error', e));
};
