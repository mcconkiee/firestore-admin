import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the filterContainer state domain
 */

const selectFilterContainerDomain = state =>
  state.get('filterContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by FilterContainer
 */

const makeSelectFilterContainer = () =>
  createSelector(selectFilterContainerDomain, substate => substate);

export default makeSelectFilterContainer;
export { selectFilterContainerDomain };
