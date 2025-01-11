const isValidRss = (doc) => {
  const rssElement = doc.querySelector('rss');
  const channelElement = doc.querySelector('channel');
  const itemElement = doc.querySelector('item');

  if (rssElement && channelElement && itemElement) {
    return true;
  } else {
    return false;
  }
};

// validation/validationRss.js
export const handleRssValidation = (parsedData) => {
  if (isValidRss(parsedData)) {
    return { status: 'valid', error: 'SUCCESS', data: parsedData };
  } else {
    return {
      status: 'invalid',
      error: 'INVALID_RSS',
    };
  }
};
