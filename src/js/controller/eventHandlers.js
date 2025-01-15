const handlePostClick = (state) => (e) => {
  const {target} = e;

  const postLink = e.target.previousSibling;

  const id = target.getAttribute('data-id');

  const [post] = state.rssProcess.postsList
    .filter((postEl) => postEl.id === Number(id));

  const {title, description, url} = post;
  post.isRead = true;

  state.modal.state = 'open';
  state.modal.content = {
    id,
    title,
    description,
    url
  };
  state.modal.currentPostLink = postLink;
};

export default handlePostClick;
