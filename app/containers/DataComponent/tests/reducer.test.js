import { fromJS } from 'immutable';
import dataComponentReducer from '../reducer';

describe('dataComponentReducer', () => {
  it('returns the initial state', () => {
    expect(dataComponentReducer(undefined, {})).toEqual(fromJS({}));
  });
});
