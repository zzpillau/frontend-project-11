import axios from 'axios'
import API_URL from './config.js'
import parser from './parser.js'
import { uniqueId } from 'lodash'

// option:
// 'submitting'
// 'updating'

const loadRss = (url, state, option) => {
  state.rss.state = 'idle'
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

        state.rss.state = option

        if (state.rss.state === 'submitting') {
          state.rss.feedList = [currentFeed, ...state.rss.feedList]
          state.rss.postsList = [...currentPosts, ...state.rss.postsList]

          state.form.validationState.error = 'SUCCESS' // feedback text
          state.form.validationState.status = 'valid' // render feedback
          state.rss.state = 'success' // render posts & feeds
        }

        state.rss.state = 'idle'
        return parsed
      }
      else {
        throw new Error('Unexpected response status')
      }
    })
    .catch((error) => {
      if (error.message === 'INVALID_RSS') {
        state.form.validationState.error = error.message // ПЕРЕРАБОТАТЬ текст ошибки на state.rss.error = error.message
      }
      else {
        state.form.validationState.error = error.message //  ПЕРЕРАБОТАТЬ текст ошибки на state.form.error = 'NETWORK_ERROR'
      }
      state.rss.state = 'error' // renderFeedback запускается этим
      console.error('ERROR occurred', error)

      state.form.validationState.status = 'invalid' // ЭТО УДАЛИТЬ и ПЕРЕРАБОТАТЬ реакцию на state.rss.state = 'error'
    })
    .finally(() => {
      state.form.validationState = { error: null, status: null } // к черту удалить и не использовать
      state.form.state = 'idle'
      state.rss.state = 'idle'
    })
}

export default loadRss
