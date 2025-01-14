import { getInstanceI18n } from '../i18n/i18nConfig.js';

export const renderFeedback = (state) => {
  const { status, error } = state;

  const form = document.querySelector('.rss-form');
  const urlInput = document.querySelector('#url-input');

  const feedbackOutput = document.querySelector('.feedback');
  feedbackOutput.textContent = '';

  getInstanceI18n().then((i18n) => {
    feedbackOutput.textContent = i18n.t(`errors.${error}`);

    switch (status) {
      case 'valid':
        feedbackOutput.classList.remove('text-danger');
        urlInput.classList.remove('is-invalid');
        feedbackOutput.classList.add('text-success');
        form.reset();
        urlInput.focus();
        break;
      case 'invalid':
        urlInput.classList.add('is-invalid');
        feedbackOutput.classList.remove('text-success');
        feedbackOutput.classList.add('text-danger');
        urlInput.select();
        break;
      default:
        throw new Error('renderFeedback: Status Error');
    }
  })
  .catch((e) => {
    console.error('renderFeedback error:', e);
  });
};
