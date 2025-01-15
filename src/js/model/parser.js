const parseRss = (stringContainingXMLSource) => new Promise((resolve, reject) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(
      stringContainingXMLSource,
      'application/xml',
    );

    if (doc.querySelector('parsererror')) {
      reject(new Error('INVALID_RSS'));
      return;
    }

    resolve(doc);
  });

  export default parseRss;
