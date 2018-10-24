import { takeLatest, call, put, all } from 'redux-saga/effects';
import { FIRESTORE_FIND, FIRESTORE_FIND_W_QUERY } from './constants';
import { findWhere } from '../../lib/firestore/';
import {
  firestoreFindSuccess,
  firestoreFindError,
  firestoreUniqueKeys,
} from './actions';
import { resetFilters } from '../FilterContainer/actions';

// Individual exports for testing
function* extractUniqueKeys(data) {
  try {
    const unique = new Set(data.data.map(d => Object.keys(d.data())).flat());

    yield put(firestoreUniqueKeys([...unique]));
  } catch (error) {
    yield put(firestoreFindError(error));
  }
}

function* findCollection(action) {
  try {
    yield put(resetFilters());
    const { data } = action;
    const result = yield call(findWhere, data);
    const { docs } = result;
    yield call(extractUniqueKeys, { data: docs });
    yield put(firestoreFindSuccess(docs, data));
  } catch (e) {
    yield put(firestoreFindError(e));
  }
}
function* findDocsWithQuery(action) {
  try {
    const { data } = action;
    const result = yield call(findWhere, {
      term: data.collectionName,
      params: data.query,
    });
    const { docs } = result;
    // yield call(extractUniqueKeys, { data: docs });
    yield put(firestoreFindSuccess(docs));
  } catch (e) {
    yield put(firestoreFindError(e));
  }
}
const adminSaga = [
  takeLatest(FIRESTORE_FIND, findCollection),
  takeLatest(FIRESTORE_FIND_W_QUERY, findDocsWithQuery),
];
// Root saga
export default function* rootSaga() {
  // if necessary, start multiple sagas at once with `all`
  yield all([...adminSaga]);
}
