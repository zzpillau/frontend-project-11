import axios from 'axios';
import { API_URL } from './config.js';

export const fetchRssFeed = (url) => {
  console.log('fetchRssFeed start')
  return axios.get(`${API_URL}${encodeURIComponent(url)}`)
    .then((response) => {
      if (response.status === 200) {
        const data = response.data.contents;
        return data;
      } else {
        throw new Error();
      }
    })
    .catch((error) => {
      const errorCode = {};

      if (error.response) {
        errorCode.error = 'SERVER_RESPONSE_ERROR';
      } else if (error.request) {
        errorCode.error = 'REQUEST_ERROR';
      } else {
        errorCode.error = 'REQUEST_SETUP_ERROR';
      }

      return errorCode;
    })
}