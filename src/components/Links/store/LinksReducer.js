import * as types from './LinksActionTypes';
import {LinksState} from './LinksState';

export default function (state = new LinksState(), action) {
    switch (action.type) {
        case types.LINKS_STATE_TYPES.SET_IN_PROGRESS:
            return Object.assign({}, state, {inProgress: action.payload});
        case types.LINKS_STATE_TYPES.SET_LINKS_LIST:
            console.log(action.payload);
            return Object.assign({}, state, {linksList: action.payload});
        case types.LINKS_STATE_TYPES.SET_COMMENTS_FOR_LINK:
            let list = [...state.linksList];
            list[action.payload.metadata.index].comments = action.payload.comments;
            return Object.assign({}, state, {linksList: list});
        default:
            return state;
    }
}