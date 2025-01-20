const parseRss = (source) => new Promise((resolve, reject) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(
    source,
    'application/xml',
  );

  if (doc.querySelector('parsererror')) {
    const error = new Error();
    error.data = { error: 'INVALID_RSS', status: 'invalid' };
    reject(error.data);
  }

  resolve(doc);
});

export default parseRss;
