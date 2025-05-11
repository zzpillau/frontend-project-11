const renderFeedback = (state, elements, i18n) => {
  const { form, input, output } = elements
  const { status, error } = state.form.validationState

  output.textContent = ''
  output.textContent = i18n.t(`errors.${error}`)

  switch (status) {
    case 'valid':
      form.reset()
      output.classList.remove('text-danger')
      input.classList.remove('is-invalid')
      output.classList.add('text-success')
      input.focus()
      break
    case 'invalid':
      input.classList.add('is-invalid')
      output.classList.remove('text-success')
      output.classList.add('text-danger')
      input.select()
      break
    default:
      throw new Error('renderFeedback: Status Error')
  }
}

export default renderFeedback
