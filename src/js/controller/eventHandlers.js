import watchedState from '../view/view.js';

const handlePostClick = (e) => {
  const { target } = e;

  const postLink = e.target.previousSibling;

  const id = target.getAttribute('data-id');

  const [ post ] = watchedState.rssProcess.postsList.filter((postEl) => postEl.id === Number(id),);

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

export default handlePostClick;
