import { watchedState } from './init/initState.js';

export const handlePostClick = (e) => {
  console.log('Post clicked');

  const target = e.target;

    const postLink = e.target.previousSibling;

    postLink.classList.remove('fw-bold');
    postLink.classList.add('fw-normal', 'link-secondary');

    const id = target.getAttribute('data-id');

    const [post] = watchedState.rssProcess.postsList.filter(
      (post) => post.id === Number(id),
    );

    const { title, description, url } = post;

    watchedState.modal.state = 'open';
    watchedState.modal.content = {
      id,
      title,
      description,
      url,
    };

};
