import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminContainer state domain
 */

const selectAdminContainerDomain = state =>
  state.get('adminContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminContainer
 */

const makeSelectAdminContainer = () =>
  createSelector(selectAdminContainerDomain, substate => substate);

export default makeSelectAdminContainer;
export { selectAdminContainerDomain };
