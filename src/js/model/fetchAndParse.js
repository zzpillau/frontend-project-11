import fetchRssFeed from './fetchRssFeed.js'
import parseRss from './parser.js'

const fetchAndParse = url => fetchRssFeed(url)
  .then((result) => {
    if (result.status === 'success') {
      return parseRss(result.data)
    }
    console.error('Fetch result status:', result)
    return Promise.reject(result)
  })

export default fetchAndParse
