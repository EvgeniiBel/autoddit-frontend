import * as types from './LinksActionTypes';
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {HttpApi} from '../../../api';

const commentsURL = '/comments';
const commentURL = '/comment';

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

function* voteForComment(action) {
    try {
        let newComment = yield call(HttpApi.post, `${commentURL}/${action.payload.id}`, {
            value: action.payload.value,
            login: action.payload.login
        });
        yield put({type: types.LINKS_STATE_TYPES.VOTE_FOR_COMMENT_SUCCESS, payload: {comment:newComment, metadata:action.payload}});
    } catch (e) {
        yield put({type: types.LINKS_STATE_TYPES.VOTE_FOR_LINK_FAILED, payload: e.message});
    }
}

function* addComment(action) {
    try {
        const newComment = yield call(HttpApi.post, `${commentsURL}`, action.payload);
        yield put({type: types.LINKS_STATE_TYPES.ADD_COMMENT_SUCCESS, payload: {comment:newComment, metadata:action.payload}});
        //set
    } catch (e) {
        yield put({type: types.LINKS_STATE_TYPES.ADD_COMMENT_FAILED, payload: e.message});
    }
}

function* commentsSaga() {
    yield takeEvery(types.LINKS_STATE_TYPES.GET_COMMENTS_FOR_LINK, fetchCommentsForLink);
    yield takeEvery(types.LINKS_STATE_TYPES.VOTE_FOR_COMMENT, voteForComment);
    yield takeEvery(types.LINKS_STATE_TYPES.ADD_COMMENT, addComment);
}

export default commentsSaga;