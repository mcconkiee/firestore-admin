/*
 *
 * ReferenceDetails reducer
 *
 */

import { fromJS } from 'immutable';
import { FIND_DOC_SUCCESS, FIND_DOC_ERROR } from './constants';

export const initialState = fromJS({
  doc: null,
  error: null,
});

function referenceDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case FIND_DOC_SUCCESS:
      return { ...state, doc: action.data };
    case FIND_DOC_ERROR:
      return { ...state, error: action.data };
    default:
      return state;
  }
}

export default referenceDetailsReducer;
