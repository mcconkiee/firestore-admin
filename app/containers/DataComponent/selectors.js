import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dataComponent state domain
 */

const selectDataComponentDomain = state =>
  state.get('dataComponent', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by DataComponent
 */

const makeSelectDataComponent = () =>
  createSelector(selectDataComponentDomain, substate => substate.toJS());

export default makeSelectDataComponent;
export { selectDataComponentDomain };
