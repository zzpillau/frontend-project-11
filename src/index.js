import './scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { initApp } from './js/init/init.js';
import { runApp } from './js/app.js';

initApp();

document.addEventListener('DOMContentLoaded', () => {
  runApp();
});



// const axios = require('axios');
// const yup = require('yup');

// const validationSchema = yup.object({
//   url: yup
//     .string()
//     .url('Ссылка должна быть валидным URL')
//     .required()
//     .test('is-rss', 'Ресурс не содержит валидный RSS', (value) => {
//       return axios.get(value)
//         .then(response => {
//           // Проверяем, что статус ответа 200 и тип контента application/rss+xml или application/xml
//           return response.status === 200 && 
//                  (response.headers['content-type'].includes('application/rss+xml') || 
//                   response.headers['content-type'].includes('application/xml'));
//         })
//         .catch(() => false);
//     }),
// });

// export const validateUrl = (input) => {
//   const validationState = {
//     error: [],
//     status: 'invalid',
//   };

//   return validationSchema
//     .validate({ url: input })
//     .then(() => {
//       validationState.status = 'valid';
//       return validationState;
//     })
//     .catch((e) => {
//       validationState.status = 'invalid';
//       validationState.error.push(...e.errors);
//       console.log('VALIDATION ERROR!!! pushed in state', e.errors);
//       return validationState;
//     });
// };

