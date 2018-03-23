import * as types from './LinksActionTypes';
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {HttpApi} from '../../../api';

const linkURL = '/link';
const linksURL = '/links';
const commentsURL = '/comments';

function* fetchLinksList() {
    try {
        const response = yield call(HttpApi.get, linksURL);
        yield put({type: types.LINKS_STATE_TYPES.SET_LINKS_LIST, payload: response});
    } catch (e) {
        yield put({type: types.LINKS_STATE_TYPES.GET_LINKS_LIST_FAILED, payload: e.message});
    }
}

function* fetchCommentsForLink(action) {
    try {
        const response = yield call(HttpApi.get, `${commentsURL}/${action.payload.id}`);
        yield put({
            type: types.LINKS_STATE_TYPES.SET_COMMENTS_FOR_LINK,
            payload: {metadata: action.payload, comments: response}
        });
    } catch (e) {
        yield put({type: types.LINKS_STATE_TYPES.GET_COMMENTS_FOR_LINK_FAILED, payload: e.message});
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

function* addComment(action) {
    try {
        console.log('addComment');
        console.log(action);
        const newComment = yield call(HttpApi.post, `${commentsURL}`, action.payload);
        yield put({type: types.LINKS_STATE_TYPES.ADD_COMMENT_SUCCESS, payload: {comment:newComment, metadata:action.payload}});
        //set
    } catch (e) {
        yield put({type: types.LINKS_STATE_TYPES.ADD_COMMENT_FAILED, payload: e.message});
    }
}

function* linksSaga() {
    yield takeEvery(types.LINKS_STATE_TYPES.GET_LINKS_LIST, fetchLinksList);
    yield takeEvery(types.LINKS_STATE_TYPES.GET_COMMENTS_FOR_LINK, fetchCommentsForLink);
    yield takeEvery(types.LINKS_STATE_TYPES.VOTE_FOR_LINK, voteForLink);
    yield takeEvery(types.LINKS_STATE_TYPES.ADD_LINK, addLink);
    yield takeEvery(types.LINKS_STATE_TYPES.ADD_COMMENT, addComment);
}

export default linksSaga;