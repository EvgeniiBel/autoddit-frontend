const STATE_ENCODING = '_LINKS__STATE';

export const LINKS_STATE_TYPES = {
    SET_IN_PROGRESS: `SET_IN_PROGRESS${STATE_ENCODING}`,
    SET_LINKS_LIST: `SET_LINKS_LIST${STATE_ENCODING}`,

    GET_COMMENTS_FOR_LINK: `GET_COMMENTS_FOR_LINK${STATE_ENCODING}`,
    SET_COMMENTS_FOR_LINK: `SET_COMMENTS_FOR_LINK${STATE_ENCODING}`,
    GET_COMMENTS_FOR_LINK_SUCCESS: `GET_COMMENTS_FOR_LINK_SUCCESS${STATE_ENCODING}`,
    GET_COMMENTS_FOR_LINK_FAILED: `GET_COMMENTS_FOR_LINK_FAILED${STATE_ENCODING}`,

    GET_LINKS_LIST: `GET_LINKS_LIST${STATE_ENCODING}`,
    GET_LINKS_LIST_FAILED: `GET_LINKS_LIST_FAILED${STATE_ENCODING}`,

    VOTE_FOR_LINK: `VOTE_FOR_LINK${STATE_ENCODING}`,
    VOTE_FOR_LINK_SUCCESS: `VOTE_FOR_LINK_SUCCESS${STATE_ENCODING}`,
    VOTE_FOR_LINK_FAILED: `VOTE_FOR_LINK_FAILED${STATE_ENCODING}`,
};