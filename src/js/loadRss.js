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
          state.rss.feeds = [currentFeed, ...state.rss.feeds]
          state.rss.posts = [...currentPosts, ...state.rss.posts]

          state.rss.error = 'SUCCESS'
          state.rss.state = 'success'
        }

        return parsed
      }
      else {
        throw new Error('Unexpected response status')
      }
    })
    .catch((error) => {
      if (error.message === 'INVALID_RSS') {
        state.rss.error = error.message
      }
      else {
        state.rss.error = 'NETWORK_ERROR'
      }
      console.error('RSS ERROR occurred', error)
      state.rss.state = 'error'
    })
    .finally(() => {
      state.rss.state = 'idle'
      state.rss.error = null
    })
}

export default loadRss
