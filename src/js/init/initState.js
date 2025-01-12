import { watchState } from '../view/view.js';

const initState = {
  rssProcess: {
    state: 'initial', // validating, sending, success, error
    error: '', // код ошибки, обрабатывается i18n
    input: '', // string to validate
    feedList: [], // storage
    postsList: [],
    newPosts: [],
    updateState: 'idle', // idle, updating, updateSuccess, updateError
    updateError: '', // код ошибки обновления, обрабатывается i18n
    updateTimeout: 5000,
  },
  validationState: {
    status: '', // valid, invalid
    error: '', // код ошибки, обрабатывается i18n
  },
};

export const watchedState = watchState(initState);
