import { getNumAPI, addNumAPI, deleteNumByIdAPI } from '../api/index'
import { initList } from '../store/numSlice'
import { GET_NUMBERS, ADD_NUM, DELETE_NUM_BY_ID } from './types/type'
import { put, call, takeEvery } from 'redux-saga/effects'

export function* getNumSaga () {
    const num = yield call(getNumAPI);
    yield put(initList(num.data));
}

export function* addNumSaga (num) {
    yield addNumAPI(num.num);
}

export function* deleteNumSaga (id) {
    yield deleteNumByIdAPI(id.id)
}

export function* watchUsersAsync() {
    yield takeEvery(GET_NUMBERS, getNumSaga)
    yield takeEvery(ADD_NUM, addNumSaga)
    yield takeEvery(DELETE_NUM_BY_ID, deleteNumSaga)
}