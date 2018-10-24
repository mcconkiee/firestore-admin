import { fromJS } from 'immutable';
import adminContainerReducer from '../reducer';

describe('adminContainerReducer', () => {
  it('returns the initial state', () => {
    expect(adminContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
