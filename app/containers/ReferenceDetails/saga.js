import { takeLatest, call, put, all } from 'redux-saga/effects';
import { FIND_DOC } from './constants';
import { findDoc } from '../../lib/firestore/';
import { findDocSuccess, findDocError } from './actions';

// Individual exports for testing

function* findDocWithPath(action) {
  try {
    const { data } = action;
    const result = yield call(findDoc, data);
    yield put(findDocSuccess(result));
  } catch (e) {
    yield put(findDocError(e));
  }
}
const saga = [takeLatest(FIND_DOC, findDocWithPath)];
// Root saga
export default function* rootSaga() {
  // if necessary, start multiple sagas at once with `all`
  yield all([...saga]);
}
