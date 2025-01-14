import './scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { initApp } from './js/init/init.js';
import { runApp } from './js/app.js';

import { hideModal } from './js/view/hideModal.js';

initApp();

document.addEventListener('DOMContentLoaded', () => {
  runApp();

  document.getElementById('url-input').value =
    'https://lorem-rss.hexlet.app/feed';

  hideModal();
});
