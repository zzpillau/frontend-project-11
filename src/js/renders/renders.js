export const renderPosts = (state, elements, i18n) => {
  const postsList = state.rss.postsList
  const { posts: postsCont } = elements

  postsCont.innerHTML = ''

  const postsContainer = document.createElement('div')
  postsContainer.classList.add('card', 'border-0')

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

  postsContainer.append(cardBody)
  postsContainer.append(ul)
  postsCont.append(postsContainer)

  return postsCont
}

export const renderFeeds = (state, elements, i18n) => {
  const feedsList = state.rss.feedList
  const { feeds: feedsCont } = elements

  feedsCont.innerHTML = ''

  const feedsContainer = document.createElement('div')
  feedsContainer.classList.add('card', 'border-0')

  const cardBody = document.createElement('div')
  cardBody.classList.add('card-body')

  const h2 = document.createElement('h2')
  h2.classList.add('card-title', 'h4')
  h2.textContent = i18n.t('headers.feeds')

  const ul = document.createElement('ul')
  ul.classList.add('feed-list', 'list-group', 'border-0', 'rounded-0')

  feedsList.forEach((feed) => {
    const { title, description } = feed

    const currentFeed = document.createElement('li')
    currentFeed.classList.add('list-group-item', 'border-0', 'border-end-0')

    const h3 = document.createElement('h3')
    h3.classList.add('h6', 'm-0')
    h3.textContent = title

    const p = document.createElement('p')
    p.classList.add('m-0', 'small', 'text-black-50')
    p.textContent = description

    currentFeed.append(h3)
    currentFeed.append(p)

    ul.append(currentFeed)
  })

  cardBody.append(h2)

  feedsContainer.append(cardBody)
  feedsContainer.append(ul)
  feedsCont.append(feedsContainer)

  return feedsCont
}
