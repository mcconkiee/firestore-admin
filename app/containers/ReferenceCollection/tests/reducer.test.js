import { fromJS } from 'immutable';
import referenceCollectionReducer from '../reducer';

describe('referenceCollectionReducer', () => {
  it('returns the initial state', () => {
    expect(referenceCollectionReducer(undefined, {})).toEqual(fromJS({}));
  });
});
