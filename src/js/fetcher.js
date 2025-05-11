import axios from 'axios'
import API_URL from './config.js'
import { parser } from '../parser.js' // парсер просто возвращает данные
import { uniqueId } from 'lodash'

export const fetcher = (url, state, option = 'sending') => {
  state.rssProcess.state = option
  return axios
    .get(`${API_URL}${encodeURIComponent(url)}`, { timeout: 5000 })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data.contents

        state.form.validationState = { error: null, status: null }

        const parsed = parser(data, url)
        const currentFeed = parsed.feed
        currentFeed.id = uniqueId()

        const currentPosts = parsed.posts
        currentPosts.forEach((post) => {
          post.id = uniqueId()
          post.FEED_ID = currentFeed.id
        },
        )

        if (state.rssProcess.state === 'sending') {
          state.rssProcess.feedList = [currentFeed, ...state.rssProcess.feedList]
          state.rssProcess.postsList = [...currentPosts, ...state.rssProcess.postsList]

          state.form.validationState.error = 'SUCCESS' // render feedback
          state.form.validationState.status = 'valid'
          state.rssProcess.state = 'success'
        }

        state.rssProcess.state = 'initial'
        return parsed
      }
      else {
        throw new Error('Unexpected response status')
      }
    })
    .catch((error) => {
      if (error.message === 'INVALID_RSS') {
        state.form.validationState.error = error.message
      }
      else {
        state.form.validationState.error = 'NETWORK_ERROR'
      }
      console.error('ERROR occurred', error)
      state.form.validationState.status = 'invalid'
    })
    .finally(() => {
      state.form.validationState = { error: null, status: null }
      state.form.state = 'idle'
    })
}
