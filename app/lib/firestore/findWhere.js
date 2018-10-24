const globalConstants = require('../../globalConstants');
const { db } = globalConstants;
module.exports = (term, params) => {
  let q = db.collection(term);
  if (params) {
    params.forEach(paramSet => {
      q = q.where(paramSet[0], paramSet[1], paramSet[2]);
    });
  }
  console.log(q, 'query');
  return q.get();
};
