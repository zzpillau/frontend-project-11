import axios from 'axios';
import API_URL from '../config.js';

const fetchRssFeed = (url) => axios
    .get(`${API_URL}${encodeURIComponent(url)}`, { timeout: 5000 })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data.contents;
        return { status: 'success', data };
      }
      console.error('Unexpected response status:', response.status);
      throw new Error('Unexpected response status');
    })
    .catch((error) => {
      console.error('ERROR occurred', error);
      const errorCode = {
        status: 'error',
        error: 'NETWORK_ERROR',
      };
      return errorCode;
    });

export default fetchRssFeed;