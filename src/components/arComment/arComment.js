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

    vote = (status) => {
        this.setState({
            voteStatus: status !== this.state.voteStatus ? status : null
        });
    };

    toggleComment = ()  => {
        this.setState({
            isExpanded:!this.state.isExpanded
        })
    };

    render() {
        return (
            <div className="ar-comment">
                <div className="ar-comment__voiter">
                    <div className={cn('arrow up', {
                        'upmod': this.state.voteStatus === 'up'
                    })} onClick={() => this.vote('up')}></div>
                    <div className={cn('arrow down', {
                        'downmod': this.state.voteStatus === 'down'
                    })} onClick={() => this.vote('down')}></div>
                </div>
                <div className="ar-comment__wrapper">
                    <div className="ar-comment__wrapper__username">
                        <div className="expander">
                            <span onClick={this.toggleComment}>{this.state.isExpanded ? '[–]' : '[+]'}</span>
                        </div>
                        <div className="username">{this.props.username}</div>
                        <div className="comment-score">{this.props.score}</div>
                    </div>
                    <div className="ar-comment__wrapper__commentText">
                        {this.props.commentText}
                    </div>
                    <div className="ar-comment__wrapper__add-button">
                    </div>
                    {!!this.props.comments && this.props.comments.length > 0 &&
                    (<div className={cn('ar-link__wrapper__children', {'expanded':this.state.isExpanded})}>
                        {this.props.comments.map((comment, index) => <ArComment key={`${comment.username}${index}`}
                                                                                username={comment.username}
                                                                                commentText={comment.commentText}
                                                                                comments={comment.comments}
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
    username: PropTypes.string.isRequired,
    commentText:PropTypes.string.isRequired,
    submittedData: PropTypes.string,
    score:PropTypes.number,
    comments: PropTypes.arrayOf(PropTypes.object),
    vote: PropTypes.func,
    addComment: PropTypes.func
};

ArComment.defaultProps = {
    username: 'CharlieComment',
    commentText: 'Default comments for test',
    comments: null,
    score:null,
    vote: function () {
    },
    addComment: function () {
    }
};

export default ArComment;