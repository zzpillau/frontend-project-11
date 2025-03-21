const isValidRss = (doc) => {
  const rssElement = doc.querySelector('rss');
  const channelElement = doc.querySelector('channel');
  const itemElement = doc.querySelector('item');

  if (rssElement && channelElement && itemElement) {
    return true;
  }
  return false;
};

const handleRssValidation = (parsedData) => {
  if (isValidRss(parsedData)) {
    return { status: 'valid', error: 'SUCCESS', data: parsedData };
  }

  return {
    error: 'INVALID_RSS',
    status: 'invalid',
  };
};

export default handleRssValidation;
