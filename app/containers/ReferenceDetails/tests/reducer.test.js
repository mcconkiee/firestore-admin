import { fromJS } from 'immutable';
import referenceDetailsReducer from '../reducer';

describe('referenceDetailsReducer', () => {
  it('returns the initial state', () => {
    expect(referenceDetailsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
