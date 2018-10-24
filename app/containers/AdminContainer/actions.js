/*
 *
 * AdminContainer actions
 *
 */

import {
  FIRESTORE_FIND,
  FIRESTORE_FIND_W_QUERY,
  FIRESTORE_FIND_SUCCESS,
  FIRESTORE_FIND_ERROR,
  FIRESTORE_UNIQUE_KEYS,
} from './constants';

export const firestoreFind = term => ({
  type: FIRESTORE_FIND,
  data: term,
});
export const firestoreFindWithQuery = (query, collectionName) => ({
  type: FIRESTORE_FIND_W_QUERY,
  data: { query, collectionName },
});
export const firestoreUniqueKeys = keys => ({
  type: FIRESTORE_UNIQUE_KEYS,
  data: keys,
});

export const firestoreFindSuccess = (results, collectionName) => ({
  type: FIRESTORE_FIND_SUCCESS,
  data: results,
  collectionName,
});
export const firestoreFindError = error => ({
  type: FIRESTORE_FIND_ERROR,
  data: error,
});

export default {
  firestoreFind,
};
