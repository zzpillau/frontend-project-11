import './scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { initApp } from './js/init/init.js';
import { runApp } from './js/app.js';

initApp();

document.addEventListener('DOMContentLoaded', () => {
  runApp()
})
