import { fetcher } from './fetcher.js'
import { differenceBy } from 'lodash'


const updatePostList = (feed, state) =>
  fetcher(feed.url, state, 'updating')
    .then((parsed) => {
      const {feed, posts} = parsed;

      console.log('updateFeed is running');
   
      const updatedPostsList = posts.map((p) => p.FEED_ID = feed.id)

      return updatedPostsList
    })
    




const checkForNewPosts = (state) => {
  console.log('checkForNewPosts is RUNNING')

  const updatedFeedsPromises = state.rssProcess.feedList
    .map(feed => updateFeed(feed, state))

    console.log('updatedFeedsPromises', updatedFeedsPromises)

  Promise.all(updatedFeedsPromises)
    .then((result) => {

      console.log('result*************************', result)


      state.rssProcess.updateState = 'idle'


      // const onlyNewPosts = differenceBy(result.flat(), state.rssProcess.postsList.flat(), 'url')
      const onlyNewPosts = differenceBy(result.flat(), state.rssProcess.postsList, 'url')


      console.log('onlyNewPosts', onlyNewPosts)

      if (onlyNewPosts.length > 0) {
        state.rssProcess.postsList = [
          // ...state.rssProcess.postsList.flat(),
          ...state.rssProcess.postsList,
          ...onlyNewPosts,
        ]

        state.rssProcess.updateState = 'updateSuccess' 
      }
    })
    .catch((updateErr) => {
      state.rssProcess.updateState = 'updateError'
      state.rssProcess.updateError = updateErr
    })
    .finally(() => setTimeout(() => checkForNewPosts(state), 5000)
)
}

export default checkForNewPosts
