import * as yup from 'yup'
import checkForDuplicateFeeds from './checkForDuplicateFeeds.js'

const initializeValidationSchema = () => {
  yup.setLocale({
    string: {
      url: 'INVALID_URL',
    },
  })
  return yup.object({
    url: yup.string().url().required(),
  })
}

const validateUrlAndDuplicates = (input, feedList) => {
  const validationState = {
    error: '',
    status: '',
  }

  const schema = initializeValidationSchema()

  return schema
    .validate({ url: input })
    .then(() => {
      const hasNoDuplicates = !checkForDuplicateFeeds(feedList, { url: input })
      validationState.status = hasNoDuplicates ? 'valid' : 'invalid'
      validationState.error = hasNoDuplicates ? 'SUCCESS' : 'DUPLICATE_ERROR'
      return validationState
    })
    .catch((e) => {
      validationState.status = 'invalid'

      if (e.errors) {
        const { errors: [error] } = e
        validationState.error = error
      }
      else {
        validationState.error = 'GENERAL_ERROR'
      }

      return validationState
    })
}

export default validateUrlAndDuplicates
