const renderFeeds = (state, elements, i18n) => {
  const feedList = state.rss.feeds
  const { feedsContainer } = elements

  feedsContainer.innerHTML = ''

  const card = document.createElement('div')
  card.classList.add('card', 'border-0')

  const cardBody = document.createElement('div')
  cardBody.classList.add('card-body')

  const h2 = document.createElement('h2')
  h2.classList.add('card-title', 'h4')
  h2.textContent = i18n.t('headers.feeds')

  const ul = document.createElement('ul')
  ul.classList.add('feed-list', 'list-group', 'border-0', 'rounded-0')

  feedList.forEach((feed) => {
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

  card.append(cardBody)
  card.append(ul)
  feedsContainer.append(card)

  return feedsContainer
}

export default renderFeeds
