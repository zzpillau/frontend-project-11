import { Post } from '../components/Post.js';
import { Feed } from '../components/Feed.js';

export const proccessData = (data, feeds, posts, feedUrl) => {
  const channel = data.querySelector('channel');

  const feedTitle = channel.querySelector('title').textContent;
  const feedDesc = channel.querySelector('description').textContent;
  const items = channel.querySelectorAll('item');

  const newFeed = new Feed(feeds.length + 1, feedTitle, feedDesc, feedUrl);

  const newPosts = Array.from(items).map((item, i) => {
    const postsCounter = posts.length + 1 + i;

    const postTitle = item.querySelector('title').textContent;
    const postDesc = item.querySelector('description').textContent;
    const postUrl = item.querySelector('link').textContent;

    return new Post(postsCounter, newFeed.id, postTitle, postDesc, postUrl);
  });

  return {
    newFeed,
    newPosts,
  };
};
