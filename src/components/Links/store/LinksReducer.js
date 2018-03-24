import * as types from './LinksActionTypes';
import {LinksState} from './LinksState';

import {sumVotes, getParentByParentWay} from '../../../services/helper';

export default function (state = new LinksState(), action) {
    switch (action.type) {
        case types.LINKS_STATE_TYPES.SET_IN_PROGRESS:
            return Object.assign({}, state, {inProgress: action.payload});

        case types.LINKS_STATE_TYPES.SET_LINKS_LIST:
            return Object.assign({}, state, {linksList: action.payload});

        case types.LINKS_STATE_TYPES.SET_COMMENTS_FOR_LINK:
            let list1 = [...state.linksList];
            list1[action.payload.metadata.index].comments = action.payload.comments;
            return Object.assign({}, state, {linksList: list1});

        case types.LINKS_STATE_TYPES.VOTE_FOR_LINK_SUCCESS:
            let {value, login, index} = action.payload;
            let list2 = [...state.linksList];
            list2[index].votes[login] = value;
            list2[index].votesCount = sumVotes(list2[index].votes);
            return Object.assign({}, state, {linksList: list2});

        case types.LINKS_STATE_TYPES.ADD_LINK_SUCCESS:
            let list3 = [...state.linksList];
            list3.push(action.payload);
            return Object.assign({}, state, {linksList: list3});

        case types.LINKS_STATE_TYPES.ADD_COMMENT_SUCCESS:
            let list4 = [...state.linksList];
            let {linkIndex, parentWay} = action.payload.metadata;
            let parent = list4[linkIndex];
            parent.commentsCount++;
            if (!!parentWay) {
                parent = getParentByParentWay(parent, parentWay);
            }
            !parent.comments && (parent.comments = []);
            parent.comments.push(action.payload.comment);
            return Object.assign({}, state, {linksList: list4});
        default:
            return state;
    }
}
