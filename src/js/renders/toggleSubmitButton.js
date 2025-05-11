const toogleButtonState = elements => (isDisabled) => {
  const { submitButton } = elements
  submitButton.disabled = isDisabled
}

export const disableSubmitButton = elements => toogleButtonState(elements)(true)

export const enableSubmitButton = elements => toogleButtonState(elements)(false)
