import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as types from './store/LinksActionTypes';
import Links from './Links';


const mapStateToProps = state => {
    return {
        links: state.LinksReducer.linksList,
        login: state.LoginReducer.login
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getLinks: () => {
            dispatch({type: types.LINKS_STATE_TYPES.GET_LINKS_LIST});
        },
        getCommentsForLink: (payload) => {
            dispatch({type: types.LINKS_STATE_TYPES.GET_COMMENTS_FOR_LINK, payload});
        },
        voteForLink: (payload) => {
            dispatch({type: types.LINKS_STATE_TYPES.VOTE_FOR_LINK, payload});
        }
    }
};

const LinksContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Links));

export default LinksContainer;