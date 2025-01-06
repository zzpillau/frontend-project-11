export const renderFeedback = (validationState) => {

  const feedback = document.querySelector('.feedback');
  feedback.textContent = text;

  switch(status) {
    case 'fail':
      const urlInput = document.querySelector('#url-input');
      urlInput.classList.add('is-invalid')
      break;
    case 'success':
    
  }



}