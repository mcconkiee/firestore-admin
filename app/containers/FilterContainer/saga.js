import { takeLatest, call, put, all } from 'redux-saga/effects';
import { APPLY_FILTERS, APPLY_CURRENT_FILTERS } from './constants';
import { findWhere } from '../../lib/firestore/';
import { appliedFilterSuccess, appliedFilterError } from './actions';
import { appStore } from '../../app';

function* applyFilters(action) {
  try {
    const { data } = action;

    const { filters, collectionName } = data;
    const params = filters.map(f => [f.term, f.operator, f.val]);
    const result = yield call(findWhere, collectionName, params);
    const { docs } = result;
    yield put(appliedFilterSuccess(docs));
  } catch (e) {
    yield put(appliedFilterError(e));
  }
}
function* applyCurrentFilters() {
  try {
    const { filters } = appStore.getState().get('filterContainer');
    const { collectionName } = appStore.getState().get('adminContainer');
    const action = { data: { collectionName, filters } };
    yield call(applyFilters, action);
  } catch (e) {
    yield put(appliedFilterError(e));
  }
}
const filtersSaga = [
  takeLatest(APPLY_FILTERS, applyFilters),
  takeLatest(APPLY_CURRENT_FILTERS, applyCurrentFilters),
];
// Root saga
export default function* rootSaga() {
  // if necessary, start multiple sagas at once with `all`
  yield all([...filtersSaga]);
}
