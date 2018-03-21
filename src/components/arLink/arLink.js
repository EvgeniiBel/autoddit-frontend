import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './arLink.css';

import {ArComment} from '../arComment'

class ArLink extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            voteStatus: null,
            isExpanded: false
        };
    }

    vote = (status) => {
        this.setState({
            voteStatus: status !== this.state.voteStatus ? status : null
        });
    };

    toggleComments = () => {
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    };

    render() {
        return (
            <div className="ar-link">
                <div className="ar-link__voiter">
                    <div className={cn('arrow up', {
                        'upmod': this.state.voteStatus === 'up'
                    })} onClick={() => this.vote('up')}></div>
                    <div className="votes-count">{this.props.votes}</div>
                    <div className={cn('arrow down', {
                        'downmod': this.state.voteStatus === 'down'
                    })} onClick={() => this.vote('down')}></div>
                </div>
                <div className={cn('ar-link__image', {empty: !this.props.imageUrl})}>
                    {!this.props.imageUrl && <img src={this.props.imageUrl}/>}
                </div>
                <div className="ar-link__wrapper">
                    <div className="ar-link__wrapper__title">
                        <a href={this.props.link} target="_blank">{this.props.title}</a>
                    </div>
                    <div className="ar-link__wrapper__submitted">
                        Submitted on {this.props.submittedData} by {this.props.username}
                    </div>
                    <div className="ar-link__wrapper__comments">
                        <a onClick={this.toggleComments}>{this.props.comments && this.props.comments.length} comments </a>
                    </div>
                    {!!this.props.comments && this.props.comments.length > 0 &&
                    (<div className={cn('ar-link__wrapper__children', {'expanded':this.state.isExpanded})}>
                            {this.props.comments.map((comment, index) => <ArComment key={`${comment.username}${index}`}
                                                                             username={comment.username}
                                                                             commentText={comment.commentText}
                                                                             comments={comment.comments}/>)}
                    </div>)
                    }
                </div>
            </div>
        );
    }
}

ArLink.propTypes = {
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    submittedData: PropTypes.string,
    username: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
    votes: PropTypes.number,
    link: PropTypes.string,
    vote: PropTypes.func
};

ArLink.defaultProps = {
    title: 'Full moon rising over Mount Hood',
    imageUrl: null,
    submittedData: 'Jan 22, 2017 08:43',
    username: 'Charlie',
    votes: 22,
    link: '/12',
    comments: [],
    vote: function () {
    }
};

export default ArLink;