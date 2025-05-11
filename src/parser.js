// не промис!!! просто вернуть фид и посты, объект

const parseRss = source => new Promise((resolve, reject) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(
    source,
    'application/xml',
  )

  if (doc.querySelector('parsererror')) {
    const error = new Error()
    error.data = { error: 'INVALID_RSS', status: 'invalid' } // избавляемся от статуса валидации, будет просто стейт форме
    reject(error.data)
  }

  resolve(doc)
})

export const parser = (source, url) => {
  const parsed = new DOMParser() // именование
  const doc = parsed.parseFromString( // именование
    source,
    'application/xml',
  )

  if (doc.querySelector('parsererror')) {
    throw new Error('INVALID_RSS') // ТУТ выкидывается  а ловится в submit ивенте 'INVALID_RSS'!
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

export default parseRss
