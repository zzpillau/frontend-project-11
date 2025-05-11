import validate from './validate.js'
import fetcher from './fetcher.js'

export const handleSubmit = (e, state) => {
  e.preventDefault()
  state.form.validationState = { error: null, status: null }

  state.rssProcess = { ...state.rssProcess, state: 'sending', error: null }

  state.form.state = 'validating'

  const formData = new FormData(e.target)

  const input = formData.get('url')

  const addedFeeds = state.rssProcess.feedList.map(feed => feed.url)

  validate({ url: input }, addedFeeds)
    .then(() => {
      fetcher(input, state, 'sending')
    })

    .catch((error) => {
      state.form.validationState.error = error.errors[0]
      state.form.validationState.status = 'invalid'
      state.form.state = 'idle'
    })
}

export const handlePostClick = (e, state) => {
  const { target } = e

  if (target.nodeName === 'BUTTON') {
    state.modal.state = 'idle'

    const postId = target.getAttribute('data-id')

    const post = state.rssProcess.postsList
      .find(postEl => postEl.id == postId)

    const { title, description, url, id } = post

    post.isRead = true

    state.modal.content = {
      id,
      title,
      description,
      url,
    }

    state.modal.state = 'open'
  }
}
