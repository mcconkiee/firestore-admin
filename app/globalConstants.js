const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

const config = require('../app/config');
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();
// Disable deprecated features
db.settings({
  timestampsInSnapshots: true,
});

module.exports.db = db;
