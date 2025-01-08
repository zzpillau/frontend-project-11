import { Post } from './components/Post.js';
import { Feed } from './components/Feed.js';

export const proccessData = (data) => {
  console.log(data);
  const channel = data.querySelector('channel');

  const feedTitle = channel.querySelector('title').textContent;
  const feedDesc = channel.querySelector('description').textContent;
  const items = channel.querySelectorAll('item')
  console.log('items', items)

  const f = {
    feedTitle,
    feedDesc,
  }

  const p = Array.from(items).map((item) => {
    const postTitle = item.querySelector('title').textContent;
    const postDesc = item.querySelector('description').textContent;

    return {
      postTitle,
      postDesc,
    }
  })


  const posts = [];
  // const feed = [];

  console.log('feed', feed)
  console.log('posts', posts)





};