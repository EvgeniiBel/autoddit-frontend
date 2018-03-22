import * as types from './LoginActionTypes';
import {LoginState} from './LoginState';

export default function (state = new LoginState(), action) {
    switch (action.type) {
        case types.LOGIN_STATE_TYPES.SET_NAME:
            return Object.assign({}, state, {login: action.payload});
        default:
            return state;
    }
}