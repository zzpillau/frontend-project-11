import { fetchRssFeed } from './fetchRssFeed.js';
import { parseRss } from './parser.js';
import { Post } from '../components/Post.js';
import { watchedState } from '../init/initState.js';

export const checkForNewPosts = (timeout) => {
  const updatedFeedsPromises = watchedState.rssProcess.feedList.map((feed) => {
    return fetchRssFeed(feed.url)
      .then((result) => {
        if (result.status === 'success') {
          const doc = parseRss(result.data);
          return doc;
        } else {
          throw new Error('Ошибка получения RSS фида');
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
            watchedState.rssProcess.postsList.length + 1 + i,
            FEED_ID,
            postTitle,
            postDesc,
            postUrl,
          );
        });

        return updatedPostsList;
      })
      .catch((error) => {
        console.error('Error updating feed:', feed.title, error);

        return {
          error: 'UPDATE_FAILED',
          feedTitle: feed.title,
        };
      });
  });

  Promise.all(updatedFeedsPromises)
    .then((result) => {
      if (result.some((feedResult) => feedResult.error)) {
        console.error('One or more feeds failed to update.');
      } else {
        watchedState.rssProcess.updateState = 'idle';

        const onlyNewPosts = result
          .flat()
          .filter(
            (post) =>
              !watchedState.rssProcess.postsList.some(
                (oldPost) =>
                  oldPost.title === post.title && oldPost.url === post.url,
              ),
          );

        if (onlyNewPosts.length > 0) {
          watchedState.rssProcess.newPosts = [...onlyNewPosts];
          watchedState.rssProcess.updateState = 'updateSuccess';
          watchedState.rssProcess.postsList = [
            ...watchedState.rssProcess.postsList,
            ...onlyNewPosts,
          ];
        } else {
          watchedState.rssProcess.newPosts = [];
        }
      }
      setTimeout(() => checkForNewPosts(timeout), timeout);
    })
    .catch((updateErr) => {
      watchedState.rssProcess.updateState = 'updateError';
      watchedState.rssProcess.updateError = updateErr;
      setTimeout(() => checkForNewPosts(timeout), timeout);
    });
};
