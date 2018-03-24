import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './arComment.css';

class ArComment extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            voteStatus: null,
            isExpanded:true
        };
    }

    vote = (value, myVote) => {
        if (value === myVote) {
            value = 0;
        }
        this.props.vote({
            value, id:
            this.props.id,
            linkId: this.props.linkId,
            parentWay: this.props.parentWay
        });
    };

    toggleComment = ()  => {
        this.setState({
            isExpanded:!this.state.isExpanded
        })
    };

    render() {
        let myVote = this.props.votes[this.props.login];
        return (
            <div className="ar-comment">
                <div className="ar-comment__voiter">
                    <div className={cn('arrow up', {
                        'upmod': myVote === 1
                    })} onClick={() => this.vote(1, myVote)}>
                    </div>
                    <div className={cn('arrow down', {
                        'downmod': myVote === -1
                    })} onClick={() => this.vote(-1, myVote)}>
                    </div>
                </div>
                <div className="ar-comment__wrapper">
                    <div className="ar-comment__wrapper__username">
                        <div className="expander">
                            <span onClick={this.toggleComment}>{this.state.isExpanded ? '[–]' : '[+]'}</span>
                        </div>
                        <div className="username">{this.props.username}</div>
                        <div className="comment-score">{this.props.votesCount} point(s)</div>
                    </div>
                    <div className="ar-comment__wrapper__commentText">
                        {this.props.commentText}
                    </div>
                    <div className="ar-comment__wrapper__add-button">
                        <a onClick={() => this.props.addComment({linkId: this.props.linkId,id:this.props.id, parentWay:this.props.parentWay})}>Reply</a>
                    </div>
                    {!!this.props.comments && this.props.comments.length > 0 &&
                    (<div className={cn('ar-link__wrapper__children', {'expanded':this.state.isExpanded})}>
                        {this.props.comments.map((comment, index) => <ArComment key={`${comment.username}${index}`}
                                                                                id={comment.id}
                                                                                login={this.props.login}
                                                                                linkId={comment.linkId}
                                                                                parentWay={comment.parentWay}
                                                                                username={comment.username}
                                                                                commentText={comment.commentText}
                                                                                comments={comment.comments}
                                                                                votes={comment.votes}
                                                                                votesCount={comment.votesCount}
                                                                                vote={this.props.vote}
                                                                                addComment={this.props.addComment}/>)}
                    </div>)
                    }
                </div>
            </div>
        );
    }
}

ArComment.propTypes = {
    id:PropTypes.number,
    linkId:PropTypes.number,
    parentWay:PropTypes.string,
    username: PropTypes.string.isRequired,
    commentText:PropTypes.string.isRequired,
    submittedData: PropTypes.string,
    votesCount:PropTypes.number,
    comments: PropTypes.arrayOf(PropTypes.object),
    votes: PropTypes.object,
    vote: PropTypes.func,
    addComment: PropTypes.func
};

ArComment.defaultProps = {
    username: 'CharlieComment',
    commentText: 'Default comments for test',
    comments: [],
    votesCount:0,
    votes:{},
    vote: function () {
    },
    addComment: function () {
    }
};

export default ArComment;