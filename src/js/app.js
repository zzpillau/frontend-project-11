import watchState from './view.js'
import getInstanceI18n from './i18n/i18nConfig.js'
import { handleSubmit } from './eventHandlers.js'
import handlePostClick from './eventHandlers.js'
import updatePostList from './updatePostList.js'

const runApp = () => {
  const initState = {
    form: {
      state: 'idle', // filling, validating, submitting, success, error
      validationState: {
        status: null, // valid, invalid
        error: null,
      },
    },
    rssProcess: {
      state: 'initial', // sending, success, error
      error: null,
      feedList: [],
      postsList: [],
      updateState: 'idle', // idle, success, error
      isChecking: false,
    },
    modal: {
      state: 'idle', // idle, open
      content: null,
    },
  }

  getInstanceI18n()
    .then((i18n) => {
      const state = watchState(initState, i18n)

      const form = document.querySelector('.rss-form')
      const posts = document.querySelector('.posts')

      form.addEventListener('submit', e => handleSubmit(e, state))
      posts.addEventListener('click', e => handlePostClick(e, state))

      updatePostList(state)
    })
}

export default runApp
