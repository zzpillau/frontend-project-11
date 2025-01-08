export const parseRss = (stringContainingXMLSource) => {
  return new Promise((resolve, reject) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(stringContainingXMLSource, 'application/xml');
  
    if (doc.querySelector('parsererror')) { 
      reject({error: 'INVALID_RSS'}); 
    }
    
    resolve(doc);
  })
};




