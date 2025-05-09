import axios from 'axios'
import API_URL from '../config.js'
import parseRss from './parser.js' // парсер просто возвращает данные

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

export default fetchAndParse
