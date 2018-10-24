import { takeLatest, call, put, all } from 'redux-saga/effects';
import { APPLY_FILTERS } from './constants';
import { findWhere } from '../../lib/firestore/';
import { appliedFilterSuccess, appliedFilterError } from './actions';

function* applyFilters(action) {
  try {
    const { data } = action;

    const { filters } = data;
    const params = filters.map(f => [f.term, f.operator, f.val]);
    const result = yield call(findWhere, data.collectionName, params);
    const { docs } = result;
    yield put(appliedFilterSuccess(docs));
  } catch (e) {
    yield put(appliedFilterError(e));
  }
}
const filtersSaga = [takeLatest(APPLY_FILTERS, applyFilters)];
// Root saga
export default function* rootSaga() {
  // if necessary, start multiple sagas at once with `all`
  yield all([...filtersSaga]);
}
