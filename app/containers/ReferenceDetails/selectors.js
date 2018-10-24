import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the referenceDetails state domain
 */

const selectReferenceDetailsDomain = state =>
  state.get('referenceDetails', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ReferenceDetails
 */

const makeSelectReferenceDetails = () =>
  createSelector(selectReferenceDetailsDomain, substate => substate.toJS());

export default makeSelectReferenceDetails;
export { selectReferenceDetailsDomain };
