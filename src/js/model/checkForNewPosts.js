import Post from '../components/Post.js';
import fetchAndParse from './fetchAndParse.js';

const pickNewPosts = (fetchedPosts, currentState) => fetchedPosts
  .flat()
  .filter((newP) => !currentState.rssProcess.postsList
    .some((oldP) => oldP.title === newP.title
    && oldP.url === newP.url));

const updateFeed = (feed, postsList) => new Promise((resolve, reject) => {
  fetchAndParse(feed.url)
    .then((doc) => {
      const FEED_ID = feed.id;
      const items = doc.querySelectorAll('item');

      const updatedPostsList = Array.from(items).map((item, i) => {
        const postTitle = item.querySelector('title').textContent;
        const postDesc = item.querySelector('description').textContent;
        const postUrl = item.querySelector('link').textContent;

        return new Post(
          postsList.length + 1 + i,
          FEED_ID,
          postTitle,
          postDesc,
          postUrl,
        );
      });
      resolve(updatedPostsList);
    }, (err) => {
      if (err) {
        reject(err.error);
      }
    });
});

const checkForNewPosts = (initState) => {
  const state = { ...initState };

  const { postsList } = state.rssProcess;

  const updatedFeedsPromises = state.rssProcess.feedList
    .map((feed) => updateFeed(feed, postsList));

  Promise.all(updatedFeedsPromises)
    .then((result) => {
      state.rssProcess.updateState = 'idle';

      const onlyNewPosts = pickNewPosts(result, state);

      if (onlyNewPosts.length > 0) {
        state.rssProcess.newPosts = [...onlyNewPosts];
        state.rssProcess.updateState = 'updateSuccess';
        state.rssProcess.postsList = [
          ...state.rssProcess.postsList,
          ...onlyNewPosts,
        ];
      }
      state.rssProcess.newPosts = [];
      setTimeout(() => checkForNewPosts(state), state.rssProcess.updateTimeout);
    })
    .catch((updateErr) => {
      state.rssProcess.updateState = 'updateError';
      state.rssProcess.updateError = updateErr;
      state.rssProcess.newPosts = [];
      setTimeout(() => checkForNewPosts(state), state.rssProcess.updateTimeout);
    });
};

export default checkForNewPosts;
