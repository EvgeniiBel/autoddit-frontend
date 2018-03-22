import * as types from './LinksActionTypes';
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {HttpApi} from '../../../api';

const linkURL = '/link';
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
        const response = yield call(HttpApi.get, commentsURL);
        yield put({type: types.LINKS_STATE_TYPES.SET_COMMENTS_FOR_LINK, payload:{metadata:action.payload, comments:response}});
        //set
    } catch (e) {
        yield put({type: types.LINKS_STATE_TYPES.GET_COMMENTS_FOR_LINK_FAILED, payload: e.message});
    }
}

function* voteForLink (action) {
    try {
        console.log('voteForLink');
        console.log(action);
        yield call(HttpApi.post, `${linkURL}/${action.payload.id}`, {value:action.payload.value, login:action.payload.login});
        yield put({type: types.LINKS_STATE_TYPES.VOTE_FOR_LINK_SUCCESS, payload:action.payload});
        //set
    } catch (e) {
        yield put({type: types.LINKS_STATE_TYPES.VOTE_FOR_LINK_FAILED, payload: e.message});
    }
}

function* linksSaga() {
    yield takeEvery(types.LINKS_STATE_TYPES.GET_LINKS_LIST, fetchLinksList);
    yield takeEvery(types.LINKS_STATE_TYPES.GET_COMMENTS_FOR_LINK, fetchCommentsForLink);
    yield takeEvery(types.LINKS_STATE_TYPES.VOTE_FOR_LINK, voteForLink);
}

export default linksSaga;