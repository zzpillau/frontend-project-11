const renderPosts = (state, elements, i18n) => {
  const postsList = state.rss.posts
  const { postsContainer } = elements

  postsContainer.innerHTML = ''

  const card = document.createElement('div')
  card.classList.add('card', 'border-0')

  const cardBody = document.createElement('div')
  cardBody.classList.add('card-body')

  const h2 = document.createElement('h2')
  h2.classList.add('card-title', 'h4')
  h2.textContent = i18n.t('headers.posts')

  const ul = document.createElement('ul')
  ul.classList.add('posts-list', 'list-group', 'border-0', 'rounded-0')

  postsList
    .forEach((post) => {
      const {
        id,
        title,
        url,
        isRead,
      } = post

      const currentPost = document.createElement('li')
      currentPost.classList.add(
        'list-group-item',
        'd-flex',
        'justify-content-between',
        'align-items-start',
        'border-0',
        'border-end-0',
      )

      const a = document.createElement('a')
      if (isRead) {
        a.classList.add('fw-normal', 'link-secondary')
      }
      else {
        a.classList.add('fw-bold')
      }
      a.setAttribute('href', url)
      a.setAttribute('data-id', id)
      a.setAttribute('target', '_blank')
      a.setAttribute('rel', 'noopener noreferrer')
      a.textContent = title

      const button = document.createElement('button')
      button.classList.add('btn', 'btn-outline-primary', 'btn-sm')
      button.setAttribute('type', 'button')
      button.setAttribute('data-id', id)
      button.textContent = i18n.t('buttons.view')

      currentPost.append(a)
      currentPost.append(button)

      ul.append(currentPost)
    })

  cardBody.append(h2)

  card.append(cardBody)
  card.append(ul)
  postsContainer.append(card)

  return postsContainer
}

export default renderPosts
