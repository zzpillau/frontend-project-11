import axios from 'axios';
import API_URL from '../config.js';

const fetchRssFeed = (url) => axios
  .get(`${API_URL}${encodeURIComponent(url)}`, { timeout: 5000 })
  .then((response) => {
    if (response.status === 200) {
      const data = response.data.contents;
      return { status: 'success', data };
    }
    throw new Error('Unexpected response status');
  })
  .catch((error) => {
    console.error('ERROR occurred', error);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'error',
          error: 'NETWORK_ERROR',
        });
      }, 5000);
    });
  });

export default fetchRssFeed;
