const hideModal = () => {
  try {
    const modalElement = document.getElementById('modal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
    } else {
      console.log('Modal instance not found or already hidden');
    }
  } catch (error) {
    console.error('hideModal error:', error);
  }
};

export default hideModal;
