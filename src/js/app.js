import watchState from './view/view.js'
// import initialRender from './view/renders/initialRender.js';
import getInstanceI18n from './view/i18n/i18nConfig.js'
import validateUrlAndDuplicates from './model/validation/validateUrlAndDuplicates.js'
import handleRssValidation from './model/validation/validationRss.js'
import proccessData from './model/proccessData.js'
import checkForNewPosts from './model/checkForNewPosts.js'
import fetchAndParse from './model/fetchAndParse.js'

console.log('APP IS RUNNING')

const handleValidationError = (currentState, validationError) => {
  const state = { ...currentState }
  console.error('handleValidationError', validationError)
  state.form.validationState.error = validationError.error || 'GENERAL_ERROR'
  state.form.validationState.status = 'invalid'
}

const handleFetchError = (currentState, fetchError) => {
  const state = { ...currentState }

  console.error('handleFetchError', fetchError)
  state.rssProcess.error = fetchError.error
  state.rssProcess.state = 'error'
}

const processRssData = (currentState, doc, url) => {
  const state = { ...currentState }

  const rssValidation = handleRssValidation(doc)

  if (rssValidation && rssValidation.status === 'valid') {
    state.form.validationState.error = rssValidation.error
    state.form.validationState.status = rssValidation.status

    const feeds = state.rssProcess.feedList
    const posts = state.rssProcess.postsList

    const data = proccessData(rssValidation.data, feeds, posts, url)

    state.rssProcess.feedList.unshift(data.newFeed)
    state.rssProcess.postsList.unshift(...data.newPosts)
    state.rssProcess.state = 'success'

    state.form.state = 'success'
  }
  state.rssProcess.state = 'idle'
}

const runApp = () => {
  const initState = {
    form: {
      state: 'idle', // filling, validating, submitting, success, error
      validationState: {
        status: null, // valid, invalid
        error: null, // код ошибки, обрабатывается i18n
      },
    },
    rssProcess: {
      state: 'initial', // sending, success, error
      error: null, // код ошибки, обрабатывается i18n
      feedList: [], // фиды
      postsList: [], // посты
      updateState: 'idle', // idle, updateSuccess, updateError
      updateError: null, // код ошибки обновления, обрабатывается i18n
    },
    modal: {
      state: 'idle', // idle, open
      content: null, // динамический контент модального окна
    },
  }

  getInstanceI18n()
    .then((i18n) => {
      const state = watchState(initState, i18n)

      // getInstanceI18n()
      // .then((i18n) => {
      // const rootContainer = document.body;
      // rootContainer.classList.add('d-flex', 'flex-column', 'min-vh-100');

      // initialRender(rootContainer, i18n);
      const form = document.querySelector('.rss-form')

      form.addEventListener('submit', (event) => {
        event.preventDefault()

        state.form.state = 'validating'

        const formData = new FormData(form)

        state.form.validationState = { error: null, status: null }
        state.rssProcess = { ...state.rssProcess, state: 'sending', error: null }
        const input = formData.get('url')

        validateUrlAndDuplicates(input, state.rssProcess.feedList)
          .then((validState) => {
            if (validState.status === 'valid') {
              form.state = 'submitting'
              return fetchAndParse(input)
            }

            state.form.validationState.error = validState.error
            state.form.validationState.status = validState.status
            return Promise.reject(validState)
          })
          .then((doc) => {
            processRssData(state, doc, input)
            checkForNewPosts(state)
            state.form.state = 'idle'
          })

          .catch((error) => {
            state.form.state = 'error'
            return error.status === 'invalid'
              ? handleValidationError(state, error)
              : handleFetchError(state, error)
          })
      })
    })
}

export default runApp
