import 'bootstrap/dist/css/bootstrap.min.css';
import runApp from './js/app.js';
import hideModal from './js/view/renders/hideModal.js';

runApp();

document.addEventListener('DOMContentLoaded', () => {
  hideModal();
});
