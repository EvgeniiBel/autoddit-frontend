import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as types from './store/LoginActionTypes';
import Login from './Login';



const mapDispatchToProps = dispatch => {
    return {
        getLinks: payload => {
            dispatch({type: types.LOGIN_STATE_TYPES.SET_NAME, payload});
        }
    }
};

const LoginContainer = withRouter(connect(
    null,
    mapDispatchToProps
)(Login));

export default LoginContainer;