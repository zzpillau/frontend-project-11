const parseRss = (stringContainingXMLSource) => new Promise((resolve, reject) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(
      stringContainingXMLSource,
      'application/xml',
    );

    if (doc.querySelector('parsererror')) {
      const error = new Error()
      error.data = { error: 'INVALID_RSS' }
      reject(error.data);
    }

    resolve(doc);
  });

  export default parseRss;
