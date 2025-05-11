import getInstanceI18n from '../i18n/i18nConfig.js'

const handleValidState = (form, input, output) => {
  output.classList.remove('text-danger')
  input.classList.remove('is-invalid')
  output.classList.add('text-success')
  form.reset()
  input.focus()
}

const handleInvalidState = (input, output) => {
  input.classList.add('is-invalid')
  output.classList.remove('text-success')
  output.classList.add('text-danger')
  input.select()
}

const renderFeedback = (state) => {
  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('#url-input'),
    output: document.querySelector('.feedback'),
  }

  const { form, input, output } = elements
  const { status, error } = state

  output.textContent = ''
  getInstanceI18n()
    .then((i18n) => {
      output.textContent = i18n.t(`errors.${error}`)

      switch (status) {
        case 'valid':
          handleValidState(form, input, output)
          break
        case 'invalid':
          handleInvalidState(input, output)
          break
        default:
          throw new Error('renderFeedback: Status Error')
      }
    })
    .catch((e) => {
      console.error('renderFeedback error:', e)
    })
}

export default renderFeedback
