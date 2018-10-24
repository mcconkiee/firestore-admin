/*
 *
 * ReferenceDetails actions
 *
 */

import { FIND_DOC, FIND_DOC_SUCCESS, FIND_DOC_ERROR } from './constants';

export function findDoc(path) {
  return {
    type: FIND_DOC,
    data: path,
  };
}
export function findDocSuccess(docSnap) {
  return {
    type: FIND_DOC_SUCCESS,
    data: docSnap,
  };
}
export function findDocError(error) {
  return {
    type: FIND_DOC_ERROR,
    data: error,
  };
}
