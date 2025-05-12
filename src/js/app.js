import watchState from './view.js'
import getInstanceI18n from './i18n/i18nConfig.js'
import { handleSubmit, handlePostClick } from './eventHandlers.js'
import updatePosts from './updatePosts.js'

const runApp = () => {
  const initState = {
    form: {
      state: 'idle', // validating, success, error
      validationState: {
        status: null, // valid, invalid
        error: null,
      },
    },
    rss: {
      state: 'idle', // submitting, success, error
      error: null,
      feedList: [],
      postsList: [],
      isChecking: false,
    },
    modal: {
      state: 'idle', // idle, open
      content: null,
    },
  }

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('#url-input'),
    output: document.querySelector('.feedback'),
    submitButton: document.querySelector('[type="submit"]'),

    posts: document.querySelector('.posts'),
    feeds: document.querySelector('.feeds'),

    modal: document.querySelector('#modal'),
    modalTitle: document.querySelector('.modal-title'),
    modalBody: document.querySelector('.modal-body'),
    btnPrimary: document.querySelector('.modal-footer .btn-primary'),
    btnSecondary: document.querySelector('.modal-footer .btn-secondary'),

    currentPostElement: id => document.querySelector(`[data-id="${id}"]`),
  }

  getInstanceI18n()
    .then((i18n) => {
      const state = watchState(initState, elements, i18n)

      elements.form.addEventListener('submit', e => handleSubmit(e, state))
      elements.posts.addEventListener('click', e => handlePostClick(e, state))

      updatePosts(state)
    })
    .catch(err => console.error(err))
}

export default runApp
