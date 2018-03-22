import * as types from './LinksActionTypes';
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {HttpApi} from '../../../api';

const URL = '/links';

function* fetchLinksList() {
    try {
        console.log('fetchLinksList');
        const response = yield call(HttpApi.get, URL);
        yield put({type: types.LINKS_STATE_TYPES.SET_LINKS_LIST, payload: response});
        //set
    } catch (e) {
        yield put({type: types.LINKS_STATE_TYPES.GET_LINKS_LIST_FAILED, payload: e.message});
    }
}

function* linksSaga() {
    yield takeEvery(types.LINKS_STATE_TYPES.GET_LINKS_LIST, fetchLinksList);
}

export default linksSaga;