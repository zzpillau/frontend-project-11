export default (source, url) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(
    source,
    'application/xml',
  )

  if (doc.querySelector('parsererror')) {
    throw new Error('INVALID_RSS')
  }

  const channel = doc.querySelector('channel')

  const feed = {}

  feed.title = channel.querySelector('title').textContent
  feed.description = channel.querySelector('description').textContent
  feed.url = url

  const items = channel.querySelectorAll('item')

  const posts = Array.from(items).map((item) => {
    const title = item.querySelector('title').textContent
    const description = item.querySelector('description').textContent
    const url = item.querySelector('link').textContent

    return {
      title,
      description,
      url,
      isRead: false,
    }
  })

  return { feed, posts }
}
