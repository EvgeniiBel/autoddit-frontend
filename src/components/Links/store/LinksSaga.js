import * as types from './LinksActionTypes';
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {HttpApi} from '../../../api';

const linkURL = '/link';
const linksURL = '/links';

function* fetchLinksList() {
    try {
        const response = yield call(HttpApi.get, linksURL);
        yield put({type: types.LINKS_STATE_TYPES.SET_LINKS_LIST, payload: response});
    } catch (e) {
        yield put({type: types.LINKS_STATE_TYPES.GET_LINKS_LIST_FAILED, payload: e.message});
    }
}

function* voteForLink(action) {
    try {
        yield call(HttpApi.post, `${linkURL}/${action.payload.id}`, {
            value: action.payload.value,
            login: action.payload.login
        });
        yield put({type: types.LINKS_STATE_TYPES.VOTE_FOR_LINK_SUCCESS, payload: action.payload});
    } catch (e) {
        yield put({type: types.LINKS_STATE_TYPES.VOTE_FOR_LINK_FAILED, payload: e.message});
    }
}

function* addLink(action) {
    try {
        const newLink = yield call(HttpApi.post, `${linksURL}`, action.payload);
        yield put({type: types.LINKS_STATE_TYPES.ADD_LINK_SUCCESS, payload: newLink});
        //set
    } catch (e) {
        yield put({type: types.LINKS_STATE_TYPES.ADD_LINK_FAILED, payload: e.message});
    }
}

function* linksSaga() {
    yield takeEvery(types.LINKS_STATE_TYPES.GET_LINKS_LIST, fetchLinksList);
    yield takeEvery(types.LINKS_STATE_TYPES.VOTE_FOR_LINK, voteForLink);
    yield takeEvery(types.LINKS_STATE_TYPES.ADD_LINK, addLink);
}

export default linksSaga;