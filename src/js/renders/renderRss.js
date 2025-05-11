import { createFeeds, createPosts } from './renders.js'

// options:
// 'all' - render feeds and posts
// 'posts' - render updated posts

const renderRSS = (state, i18n, option = 'all') => {
  const feedsList = state.rssProcess.feedList
  const postsList = state.rssProcess.postsList

  const feedsContainer = document.querySelector('.feeds')
  const postsContainer = document.querySelector('.posts')

  if (option === 'all') {
    feedsContainer.innerHTML = ''
    feedsContainer.append(createFeeds(feedsList, i18n))
  }

  if (option === 'all' || option === 'posts') {
    postsContainer.innerHTML = ''
    postsContainer.append(createPosts(postsList, i18n))
  }
}
export default renderRSS
