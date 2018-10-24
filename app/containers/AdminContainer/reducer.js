/*
 *
 * AdminContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  FIRESTORE_FIND_SUCCESS,
  FIRESTORE_FIND_ERROR,
  FIRESTORE_UNIQUE_KEYS,
} from './constants';

export const initialState = fromJS({
  collectionName: null,
  docs: null,
  error: null,
  uniqueKeys: null,
});

function adminContainerReducer(state = initialState, action) {
  switch (action.type) {
    case FIRESTORE_FIND_SUCCESS:
      return {
        ...state,
        docs: action.data,
        collectionName: action.collectionName,
      };
    case FIRESTORE_FIND_ERROR:
      return {
        ...state,
        error: action.data,
      };
    case FIRESTORE_UNIQUE_KEYS:
      return {
        ...state,
        uniqueKeys: action.data,
      };
    default:
      return state;
  }
}

export default adminContainerReducer;
