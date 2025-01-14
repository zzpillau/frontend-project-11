import { watchState } from '../view/view.js';

const initState = {
  rssProcess: {
    state: 'initial', // sending, success, error
    error: '', // код ошибки, обрабатывается i18n
    input: '', // инпут формы
    feedList: [], // фиды
    postsList: [], // посты
    newPosts: [],
    updateState: 'idle', // idle, updateSuccess, updateError
    updateError: '', // код ошибки обновления, обрабатывается i18n
    updateTimeout: 5000,
  },
  modal: {
    state: 'idle', // idle, open
    content: null,
    currentPostElement: null,
  },
  validationState: {
    status: '', // valid, invalid
    error: '', // код ошибки, обрабатывается i18n
  },
};

export const watchedState = watchState(initState);
