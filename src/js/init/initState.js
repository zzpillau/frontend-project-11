export const initState = {
  rssProcess: {
    state: 'initial', // validating, sending, success, error
    error: '', // код ошибки который потом обрабатывается i18n
    input: '', // string to validate
    feedList: [], // storage
    postsList: [],
  },
  validationState: {
    status: '', // valid, invalid
    error: '', // код ошибки который потом обрабатывается i18n
  },
};
