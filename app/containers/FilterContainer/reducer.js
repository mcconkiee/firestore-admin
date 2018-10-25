/*
 *
 * FilterContainer reducer
 *
 */

import {
  DEFAULT_ACTION,
  ADD_FILTER,
  MODIFY_FILTER,
  APPLY_FILTER_ERROR,
  APPLY_FILTER_SUCCESS,
  RESET_FILTERS,
} from './constants';

export const initialState = () => ({
  filters: [],
  error: null,
  docs: null,
});

function filterContainerReducer(state = initialState(), action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ADD_FILTER:
      state.filters.push(action.data);
      return {
        ...state,
      };
    case APPLY_FILTER_ERROR:
      return {
        ...state,
        error: action.data,
      };
    case APPLY_FILTER_SUCCESS:
      return {
        ...state,
        docs: action.data,
      };
    case MODIFY_FILTER:
      return {
        ...state,
        filters: action.data,
      };
    case RESET_FILTERS:
      return initialState();
    default:
      return state;
  }
}

export default filterContainerReducer;
