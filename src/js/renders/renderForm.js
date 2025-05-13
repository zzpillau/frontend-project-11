const renderForm = (state, elements, i18n) => {
  const { form, input, output, submitButton } = elements
  const { state: validationState, error: validationError } = state.form
  const { state: rssState, error: rssError } = state.rss

  const getContext = () => {
    return validationError
      ? { state: validationState,
          error: validationError }
      : { state: rssState,
          error: rssError }
  }

  const currentContext = getContext()

  output.textContent = ''
  output.textContent = i18n.t(`errors.${currentContext.error}`)
  submitButton.disabled = false

  switch (currentContext.state) {
    case 'success':
      form.reset()
      output.classList.remove('text-danger')
      input.classList.remove('is-invalid')
      output.classList.add('text-success')
      input.focus()
      break
    case 'error':
      input.classList.add('is-invalid')
      output.classList.remove('text-success')
      output.classList.add('text-danger')
      input.select()
      break
    default:
      throw new Error('renderFeedback: Status Error')
  }
}

export default renderForm
