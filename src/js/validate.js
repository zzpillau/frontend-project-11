import * as yup from 'yup'

const validate = (url, feeds) => {
  const initValidationSchema = () => {
    yup.setLocale({
      string: {
        url: 'INVALID_URL',
        required: 'REQIURED',
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

  return schema.validate({ url })
}

export default validate
