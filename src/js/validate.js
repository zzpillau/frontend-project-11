import * as yup from 'yup'

const validate = (url, feeds) => {
  const initValidationSchema = () => {
    yup.setLocale({
      string: {
        url: 'INVALID_URL',
      },
      mixed: {
        notOneOf: 'DUPLICATE_ERROR',
      },
    })
    return yup.object({
      url: yup.string().url().required().notOneOf(feeds),
    })
  }

  const schema = initValidationSchema()

  return schema.validate(url)
}

export default validate

// validate({url: 'https://lorem-rss.hexlet.app/feed'}, ['https://lorem-rss.hexlet.app/feed', 'https://primamedia.ru/export/news.xml', 'https://www.apartmenttherapy.com/main.rss'])
