import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './arLink.css';

import {ArComment} from '../arComment';

class ArLink extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false
        };
    }

    vote = (value, myVote) => {
        if (value === myVote) {
            value = 0;
        }
        this.props.vote({value, id: this.props.id, login: this.props.login, index: this.props.index});
    };

    toggleComments = () => {
        if (this.props.commentsCount > 0 && !this.state.isExpanded) {
            this.props.getComments({id: this.props.id, index: this.props.index});
        }
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    };

    render() {
        let myVote = this.props.votes[this.props.login];

        return (
            <div className="ar-link">
                <div className="ar-link__voiter">
                    <div className={cn('arrow up', {
                        'upmod': myVote === 1
                    })} onClick={() => this.vote(1, myVote)}>
                    </div>
                    <div className="votes-count">{this.props.votesCount}</div>
                    <div className={cn('arrow down', {
                        'downmod': myVote === -1
                    })} onClick={() => this.vote(-1, myVote)}>
                    </div>
                </div>
                <div className={cn('ar-link__image', {empty: !this.props.imageUrl})}>
                    {this.props.imageUrl && <img src={this.props.imageUrl}/>}
                </div>
                <div className="ar-link__wrapper">
                    <div className="ar-link__wrapper__title">
                        <a href={this.props.link} target="_blank">{this.props.title}</a>
                    </div>
                    <div className="ar-link__wrapper__submitted">
                        Submitted on {this.props.submittedData} by {this.props.username}
                    </div>
                    <div className="ar-link__wrapper__comments">
                        <a onClick={this.toggleComments} className={cn({'empty':this.props.commentsCount === 0})}>{this.props.commentsCount} comments </a>
                        <a onClick={() => this.props.addComment(this.props.id, this.props.index)}>Add comment</a>
                    </div>
                    {!!this.props.comments && this.props.comments.length > 0 &&
                    (<div className={cn('ar-link__wrapper__children', {'expanded': this.state.isExpanded})}>
                        {this.props.comments.map((comment, index) => (
                            <ArComment key={`${comment.username}${index}`}
                                       linkId={comment.linkId}
                                       id={comment.id}
                                       parentWay={comment.parentWay}
                                       username={comment.username}
                                       commentText={comment.commentText}
                                       comments={comment.comments}
                                       votes={comment.votes}
                                       votesCount={comment.votesCount}
                                       login={this.props.login}
                                       vote={(args) => this.props.voteForComment({
                                           value: args.value,
                                           id: args.id,
                                           linkId: args.linkId,
                                           parentWay:args.parentWay,
                                           login: this.props.login,
                                           index: this.props.index
                                       })}
                                       addComment={(args) => this.props.addCommentToComment(args.linkId, this.props.index, args.parentWay, args.id)}/>))}
                    </div>)
                    }
                </div>
            </div>
        );
    }
}

ArLink.propTypes = {
    id: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    login: PropTypes.string.isRequired,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    submittedData: PropTypes.string,
    username: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
    commentsCount: PropTypes.number,
    updateCounter: PropTypes.number,
    votes: PropTypes.object,
    votesCount: PropTypes.number,
    link: PropTypes.string,
    vote: PropTypes.func,
    voteForComment: PropTypes.func,
    getComments: PropTypes.func,
    addComment: PropTypes.func,
    addCommentToComment: PropTypes.func
};

ArLink.defaultProps = {
    title: 'Full moon rising over Mount Hood',
    imageUrl: null,
    submittedData: 'Jan 22, 2017 08:43',
    username: 'Charlie',
    votes: {},
    votesCount: 0,
    updateCounter: 0,
    link: '/12',
    comments: [],
    commentsCount: 2,
    vote: function () {
    },
    voteForComment: function () {
    },
    getComments: function () {
    },
    addComment: function () {
    },
    addCommentToComment: function () {

    }
};

export default ArLink;