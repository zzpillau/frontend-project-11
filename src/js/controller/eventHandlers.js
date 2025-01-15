import { watchedState } from '../init/initState.js';

export const handlePostClick = (e) => {
  const target = e.target;

  const postLink = e.target.previousSibling;

  const id = target.getAttribute('data-id');

  const [post] = watchedState.rssProcess.postsList.filter(
    (post) => post.id === Number(id),
  );

  const { title, description, url } = post;
  post.isRead = true;

  watchedState.modal.state = 'open';
  watchedState.modal.content = {
    id,
    title,
    description,
    url,
  };
  watchedState.modal.currentPostLink = postLink;
};
