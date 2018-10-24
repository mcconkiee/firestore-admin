/*
 *
 * FilterContainer actions
 *
 */
import firebase from 'firebase';
import { FIRESTORE_QUERY_OPERATORS } from '../../utils/constants';

import {
  DEFAULT_ACTION,
  ADD_FILTER,
  MODIFY_FILTER,
  APPLY_FILTERS,
  APPLY_FILTER_ERROR,
  APPLY_FILTER_SUCCESS,
  RESET_FILTERS,
} from './constants';
const uuid = require('uuid/v1');
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addFilter(type = String, term = '', val = null) {
  return {
    type: ADD_FILTER,
    data: {
      id: uuid(),
      type,
      term,
      operator: FIRESTORE_QUERY_OPERATORS.EQUALS,
      val,
    },
  };
}

export function addDocRefFilter(docRef, prop) {
  return {
    type: ADD_FILTER,
    data: {
      id: uuid(),
      type: firebase.firestore.DocumentReference,
      term: prop,
      operator: FIRESTORE_QUERY_OPERATORS.EQUALS,
      val: docRef,
    },
  };
}
export function removeFilter(f, filters) {
  const newFilters = filters.filter(_f => f.id !== _f.id);
  return {
    type: MODIFY_FILTER,
    data: newFilters,
  };
}

export function resetFilters() {
  return {
    type: RESET_FILTERS,
  };
}

export function modifyFilter(filters) {
  return {
    type: MODIFY_FILTER,
    data: filters,
  };
}

export function applyFilters(filters) {
  return {
    type: APPLY_FILTERS,
    data: filters,
  };
}

export function appliedFilterError(error) {
  return {
    type: APPLY_FILTER_ERROR,
    data: error,
  };
}
export function appliedFilterSuccess(results) {
  return {
    type: APPLY_FILTER_SUCCESS,
    data: results,
  };
}
