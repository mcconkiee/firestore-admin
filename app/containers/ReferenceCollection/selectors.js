import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the referenceCollection state domain
 */

const selectReferenceCollectionDomain = state =>
  state.get('referenceCollection', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ReferenceCollection
 */

const makeSelectReferenceCollection = () =>
  createSelector(selectReferenceCollectionDomain, substate => substate.toJS());

export default makeSelectReferenceCollection;
export { selectReferenceCollectionDomain };
