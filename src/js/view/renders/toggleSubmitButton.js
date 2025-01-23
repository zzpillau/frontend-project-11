const toogleButtonState = (isDisabled) => {
  const button = document.querySelector('[type="submit"]');
  button.disabled = isDisabled;
};

export const disableSubmitButton = () => toogleButtonState(true);

export const enableSubmitButton = () => toogleButtonState(false);
