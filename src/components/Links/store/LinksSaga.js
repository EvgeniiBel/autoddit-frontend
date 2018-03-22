import * as types from './LinksActionTypes';
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {HttpApi} from '../../../api';

const linksURL = '/links';
const commentsURL = '/comments';

function* fetchLinksList() {
    try {
        console.log('fetchLinksList');
        const response = yield call(HttpApi.get, linksURL);
        yield put({type: types.LINKS_STATE_TYPES.SET_LINKS_LIST, payload: response});
        //set
    } catch (e) {
        yield put({type: types.LINKS_STATE_TYPES.GET_LINKS_LIST_FAILED, payload: e.message});
    }
}

function* fetchCommentsForLink (action) {
    try {
        console.log('fetchCommentsForLink');
        console.log(action);
        const response = yield call(HttpApi.get, commentsURL);
        yield put({type: types.LINKS_STATE_TYPES.SET_COMMENTS_FOR_LINK, payload:{metadata:action.payload, comments:response}});
        //set
    } catch (e) {
        yield put({type: types.LINKS_STATE_TYPES.GET_COMMENTS_FOR_LINK_FAILED, payload: e.message});
    }
}

function* linksSaga() {
    yield takeEvery(types.LINKS_STATE_TYPES.GET_LINKS_LIST, fetchLinksList);
    yield takeEvery(types.LINKS_STATE_TYPES.GET_COMMENTS_FOR_LINK, fetchCommentsForLink);
}

export default linksSaga;