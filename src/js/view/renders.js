const createPosts = (posts, i18n, eventHandler) => {

  const postsContainer = document.createElement('div');
  postsContainer.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.textContent = i18n.t('headers.posts');

  const ul = document.createElement('ul');
  ul.classList.add('posts-list', 'list-group', 'border-0', 'rounded-0');

  posts.forEach((post) => {
    const {
      id,
      title,
      url,
      isRead
    } = post;
  
    const currentPost = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start',
      'border-0',
      'border-end-0'
    );

    const a = document.createElement('a');
    if (isRead) {
      a.classList.add('fw-normal', 'link-secondary')
    } else {
      a.classList.add('fw-bold')
    }
    a.setAttribute('href', url);
    a.setAttribute('data-id', id);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    a.textContent = title;

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('type', 'button');
    button.setAttribute('data-id', id);

    currentPost.append(a);
    currentPost.append(button);

    currentPost.addEventListener('click', eventHandler);

    ul.append(currentPost);
  })

  cardBody.append(h2);

  postsContainer.append(cardBody);
  postsContainer.append(ul);

  return postsContainer;
     
}


const createFeeds = (feeds, i18n) => {
  const feedsContainer = document.createElement('div');
  feedsContainer.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.textContent = i18n.t('headers.feeds');

  const ul = document.createElement('ul');
  ul.classList.add('feed-list', 'list-group', 'border-0', 'rounded-0');

  feeds.forEach((feed) => {
    const {title, description} = feed;

    const currentFeed = document.createElement('li');
    currentFeed.classList.add('list-group-item', 'border-0', 'border-end-0');

    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = title;

    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = description;

    currentFeed.append(h3);
    currentFeed.append(p);

    ul.append(currentFeed);
  })

  cardBody.append(h2);

  feedsContainer.append(cardBody);
  feedsContainer.append(ul);

  return feedsContainer;
}


const createModal = (modalContent, i18n) => {
  const  {
    title, description, url,
  }  = modalContent;

  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal', 'fade');
  modalContainer.setAttribute('id', 'modal');
  modalContainer.setAttribute('tabindex', '-1');
  modalContainer.setAttribute('aria-labelledby', 'modal');
  modalContainer.setAttribute('style', 'display: none');
  modalContainer.setAttribute('aria-modal', 'true');
  modalContainer.setAttribute('role', 'dialog');

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog');
  modalDialog.setAttribute('role', 'document');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('modal-header');

  const h5 = document.createElement('h5');
  h5.classList.add('modal-title');
  h5.textContent = title;

  const closeButton = document.createElement('button');
  closeButton.classList.add('btn-close', 'close');
  closeButton.setAttribute('type', 'button');
  closeButton.setAttribute('data-bs-dismiss', 'modal');
  closeButton.setAttribute('aria-label', 'close');

  modalHeader.append(h5);
  modalHeader.append(closeButton);


  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body', 'text-break');
  modalBody.textContent = description;
  
  const modalFooter = document.createElement('div');
  modalFooter.classList.add('modal-footer');

  const a = document.createElement('a');
  a.classList.add('btn', 'btn-primary', 'full-article');
  a.setAttribute('href', url);
  a.setAttribute('role', 'button');
  a.setAttribute('target', '_blank');
  a.setAttribute('rel', 'noopener noreferrer');
  a.textContent = i18n.t('buttons.read');

  const secondaryButton = document.createElement('button');
  secondaryButton.classList.add('btn', 'btn-secondary');
  secondaryButton.setAttribute('type', 'button');
  secondaryButton.setAttribute('data-bs-dismiss', 'modal');
  secondaryButton.textContent = i18n.t('buttons.close');

  modalFooter.append(a);
  modalFooter.append(secondaryButton);

  modalContent.append(modalHeader);
  modalContent.append(modalBody);
  modalContent.append(modalFooter);

  modalDialog.append(modalContent);
  modalContainer.append(modalDialog);

  return modalContainer;
}