import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as types from './store/LoginActionTypes';
import Login from './Login';

const mapStateToProps = state => {
    return {
        login: state.LoginReducer.login
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setLogin: payload => {
            dispatch({type: types.LOGIN_STATE_TYPES.SET_NAME, payload});
        }
    }
};

const LoginContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Login));

export default LoginContainer;