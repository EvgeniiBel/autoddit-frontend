import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as types from '../Links/store/LinksActionTypes';
import AddLink from './AddLink';


const mapStateToProps = state => {
    return {
        username: state.LoginReducer.login
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addLink: (payload) => {
            dispatch({type: types.LINKS_STATE_TYPES.ADD_LINK, payload});
        }
    }
};

const AddLinkContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AddLink));

export default AddLinkContainer;