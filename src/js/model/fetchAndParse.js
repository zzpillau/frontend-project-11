import axios from 'axios'
import API_URL from '../config.js'
import parseRss from './parser.js' // избавляемся от этого
import { parser } from './parser.js' // парсер просто возвращает данные
import { uniqueId } from 'lodash'

const fetchRssFeed = url => axios
  .get(`${API_URL}${encodeURIComponent(url)}`, { timeout: 5000 })
  .then((response) => {
    if (response.status === 200) {
      const data = response.data.contents

      return { status: 'success', data }
    }
    throw new Error('Unexpected response status')
  })
  .catch((error) => {
    console.error('ERROR occurred', error)
    return {
      status: 'error',
      error: 'NETWORK_ERROR',
    }
  })

const fetchAndParse = url => fetchRssFeed(url)
  .then((result) => {
    if (result.status === 'success') {
      return parseRss(result.data)
    }
    console.error('Fetch result status:', result)
    return Promise.reject(result)
  })

// данные в state внести тут!

export const fetcher = (url, state) => {
  // state тут надо будет поменять на sending
  return axios
    .get(`${API_URL}${encodeURIComponent(url)}`, { timeout: 5000 })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data.contents
        state.form.validationState.status = 'success'
        const { feed, posts } = parser(data)
        const currentFeed = feed
        currentFeed.id = uniqueId()

        state.rssProcess.feedList = [...state.rssProcess.feedList, currentFeed]

        const currentPosts = posts
        currentPosts.forEach(post => post.id = uniqueId())

        state.rssProcess.postsList = [...state.rssProcess.postsList, currentPosts]

        // state тут надо будет поменять на success
      }
      throw new Error('Unexpected response status')
    })
    .catch((error) => {
      console.error('ERROR occurred', error)
      state.validationState.status = 'error'
      state.validationState.error = 'NETWORK_ERROR'
    })
}

// const fetchAndParsed = url => fetchRssFeed(url)
//   .then((result) => {
//     if (result.status === 'success') {
//       return parseRss(result.data)
//     }
//     console.error('Fetch result status:', result)
//     return Promise.reject(result)
//   })

export default fetchAndParse
