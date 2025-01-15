import axios from 'axios';
import { API_URL } from '../config.js';

export const fetchRssFeed = (url) => {
  return axios
    .get(`${API_URL}${encodeURIComponent(url)}`, { timeout: 5000 })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data.contents;
        return { status: 'success', data };
      } else {
        console.error('Unexpected response status:', response.status);
        throw new Error('Unexpected response status');
      }
    })
    .catch((error) => {
      console.error('ERROR occurred', error);
      const errorCode = {
        status: 'error',
        error: 'NETWORK_ERROR',
      };
      return errorCode;
    });
};
