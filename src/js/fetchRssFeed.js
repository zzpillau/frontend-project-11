import axios from 'axios';
import { API_URL } from './config.js';

export const fetchRssFeed = (url) => {
  // console.log('fetchRssFeed start');
  return axios
    .get(`${API_URL}${encodeURIComponent(url)}`, { timeout: 5000 })
    .then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        const data = response.data.contents;
        return { status: 'success', data };
      } else {
        console.error('Unexpected response status:', response.status);
        throw new Error('Unexpected response status');
      }
    })
    .catch((error) => {
      console.log('ERROR occurred', error);
      const errorCode = { status: 'error' };

      if (error.response) {
        errorCode.error = 'SERVER_RESPONSE_ERROR';
        // добавить код response.status?
        // если да, например так:
        // errorCode.statusCode = error.response.status;
      } else if (error.request) {
        errorCode.error = 'REQUEST_ERROR';
      } else {
        errorCode.error = 'REQUEST_SETUP_ERROR';
      }

      return errorCode;
    });
};
