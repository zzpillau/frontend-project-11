import fetcher from './fetcher.js'
import { differenceBy } from 'lodash'
import { isEmpty } from 'lodash'

const updatePostList = (state, delay = 5000) => {
  if (state.rssProcess.isChecking) return
  state.rssProcess.isChecking = true

  state.rssProcess.updateState = 'updating'

  const feedList = state.rssProcess.feedList
  const postsList = state.rssProcess.postsList

  const promises = feedList.map(f =>
    fetcher(f.url, state, 'updating')
      .then((parsed) => {
        const { feed, posts } = parsed

        const onlyNewPosts = differenceBy(posts, postsList, 'url')

        if (!isEmpty(onlyNewPosts)) {
          const updatedPostsList = onlyNewPosts.map(p => ({
            ...p,
            FEED_ID: feed.id,
          }))
          state.rssProcess.postsList = [
            ...updatedPostsList,
            ...state.rssProcess.postsList,
          ]
          state.rssProcess.updateState = 'success'
          return updatedPostsList
        }
        return
      })
      .catch((err) => {
        console.error(`Error updating feed: ${f.url}`, err)
        state.rssProcess.updateState = 'error'
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
      state.rssProcess.isChecking = false
      state.rssProcess.updateState = 'idle'

      setTimeout(() => updatePostList(state, delay), delay)
    })
}

export default updatePostList
