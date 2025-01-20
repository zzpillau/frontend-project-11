import Post from '../components/Post.js';
import state from '../controller/stateController.js';
import fetchRssFeed from './fetchRssFeed.js';
import parseRss from './parser.js';

const pickNewPosts = (fetchedPosts, currentState) => fetchedPosts
  .flat()
  .filter((newP) => !currentState.rssProcess.postsList
    .some((oldP) => oldP.title === newP.title
    && oldP.url === newP.url));

const checkForNewPosts = (timeout) => {
  const updatedFeedsPromises = state.rssProcess.feedList
    .map((feed) => fetchRssFeed(feed.url)
      .then((result) => {
        if (result.status === 'success') {
          const doc = parseRss(result.data);
          return doc;
        } if (result.error === 'NETWORK_ERROR') {
          console.error('Network error while fetching feed:', feed.title);
          throw new Error('NETWORK_ERROR');
        } else {
          throw new Error('GENERAL_ERROR');
        }
      })
      .then((doc) => {
        const FEED_ID = feed.id;
        const items = doc.querySelectorAll('item');

        const updatedPostsList = Array.from(items).map((item, i) => {
          const postTitle = item.querySelector('title').textContent;
          const postDesc = item.querySelector('description').textContent;
          const postUrl = item.querySelector('link').textContent;

          return new Post(
            state.rssProcess.postsList.length + 1 + i,
            FEED_ID,
            postTitle,
            postDesc,
            postUrl,
          );
        });

        return updatedPostsList;
      })
      .catch((error) => {
        if (error.message === 'NETWORK_ERROR') {
          return { error: 'NETWORK_ERROR', feedTitle: feed.title };
        }
        return { error: 'GENERAL_ERROR', feedTitle: feed.title };
      }));

  Promise.all(updatedFeedsPromises)
    .then((result) => {
      if (result.some((feedResult) => feedResult.error)) {
        result.forEach((feedResult) => {
          if (feedResult.error === 'NETWORK_ERROR') {
            console.error(`Network error: ${feedResult.feedTitle}`);
          } else if (feedResult.error === 'GENERAL_ERROR') {
            console.error(`General error: ${feedResult.feedTitle}`);
          }
        });
      } else {
        state.rssProcess.updateState = 'idle';

        const onlyNewPosts = pickNewPosts(result, state);

        if (onlyNewPosts.length > 0) {
          state.rssProcess.newPosts = [...onlyNewPosts];
          state.rssProcess.updateState = 'updateSuccess';
          state.rssProcess.postsList = [
            ...state.rssProcess.postsList,
            ...onlyNewPosts,
          ];
        } else {
          state.rssProcess.newPosts = [];
        }
      }
      setTimeout(() => checkForNewPosts(timeout), timeout);
    })
    .catch((updateErr) => {
      state.rssProcess.updateState = 'updateError';
      state.rssProcess.updateError = updateErr;
      setTimeout(() => checkForNewPosts(timeout), timeout);
    });
};

export default checkForNewPosts;
