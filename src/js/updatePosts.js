import loadRss from './loadRss.js'
import { differenceBy } from 'lodash'
import { isEmpty } from 'lodash'

const updatePosts = (state, delay = 5000) => {
  if (state.rss.isChecking) return
  state.rss.isChecking = true

  const feedList = state.rss.feedList
  const postsList = state.rss.postsList

  const promises = feedList.map(f =>
    loadRss(f.url, state, 'updating')
      .then((parsed) => {
        const { feed, posts } = parsed

        const onlyNewPosts = differenceBy(posts, postsList, 'url')

        if (!isEmpty(onlyNewPosts)) {
          const updatedPostsList = onlyNewPosts.map(p => ({
            ...p,
            FEED_ID: feed.id,
          }))
          state.rss.postsList = [
            ...updatedPostsList,
            ...state.rss.postsList,
          ]
          state.rss.state = 'updated'
          console.log('state.rss.state = updated', state.rss.state === 'updated')
          return updatedPostsList
        }
        return
      })
      .catch((err) => {
        console.error(`Error updating feed: ${f.url}`, err)
        return
      }),
  )

  Promise.all(promises)
    .then(() => {
      console.log('All feeds updated')
    })
    .catch((err) => {
      console.error('Unexpected update error ', err)
    })
    .finally(() => {
      state.rss.isChecking = false
      state.rss.state = 'idle'

      setTimeout(() => updatePosts(state, delay), delay)
    })
}

export default updatePosts
