const globalConstants = require('../../globalConstants');
const { db } = globalConstants;
module.exports = path => {
  const doc = db.doc(path);
  return doc.get();
};
