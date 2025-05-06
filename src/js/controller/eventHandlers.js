const handlePostClick = initState => (e) => {
  console.log('handlePostClick!!!!!!!!!!!!!')
  const { target } = e
  const state = { ...initState }

  state.modal.state = 'idle'

  const postId = target.getAttribute('data-id')

  const [post] = state.rssProcess.postsList
    .filter(postEl => postEl.id === Number(postId))

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

export default handlePostClick
