import validate from './validate.js'
import loadRss from './loadRss.js'

export const handleSubmit = (e, state) => {
  e.preventDefault()

  state.form.state = 'validating'

  const formData = new FormData(e.target)

  const input = formData.get('url')

  const addedFeeds = state.rss.feeds.map(feed => feed.url)

  validate(input, addedFeeds)
    .then(() => {
      loadRss(input, state, 'submitting')
    })
    .catch((error) => {
      console.error('VALIDATION ERROR occurred', error.errors[0])
      state.form.error = error.errors[0]
      state.form.state = 'error'
    })
    .finally(() => {
      state.form.error = null
      state.form.state = 'idle'
    })
}

export const handlePostClick = (e, state) => {
  const { target } = e

  if (target.nodeName === 'BUTTON') {
    state.modal.isOpen = false

    const postId = target.getAttribute('data-id')

    const post = state.rss.posts
      .find(postEl => postEl.id == postId)

    const { title, description, url, id } = post

    post.isRead = true

    state.modal.content = {
      id,
      title,
      description,
      url,
    }

    state.modal.isOpen = true
  }
}
