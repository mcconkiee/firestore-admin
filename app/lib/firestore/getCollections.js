const globalConstants = require('../../globalConstants');
const { db } = globalConstants;
module.exports = () => {
  const doc = db.getCollections();
  return doc.get();
};
