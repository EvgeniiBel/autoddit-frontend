import React from 'react';
import PropTypes from 'prop-types';
import './arLink.css';

const ArLink = (props) => (
    <div className="ar-link">
        <div className="ar-link__voiter">
            <div><i className="fas fa-arrow-up"></i></div>
            <div>{props.votes}</div>
            <div><i className="fas fa-arrow-down"></i></div>
        </div>
        <div className="ar-link__image">
            <img src={props.imageUrl}/>
        </div>
        <div className="ar-link__wrapper">
            <div className="ar-link__wrapper__title">
                <a href={props.link} target="_blank">{props.title}</a>
            </div>
            <div className="ar-link__wrapper__submitted">
                Submitted on {props.submittedData} by {props.username}
            </div>
            <div className="ar-link__wrapper__comments">
                <a>{props.comments} comments </a>
            </div>
        </div>
    </div>
);

ArLink.propTypes = {
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    submittedData: PropTypes.string,
    username: PropTypes.string,
    comments:PropTypes.number,
    votes: PropTypes.number,
    link:PropTypes.string,
    vote: PropTypes.func
};

ArLink.defaultProps = {
    title: 'Full moon rising over Mount Hood',
    imageUrl: 'null',
    submittedData: 'Jan 22, 2017 08:43',
    username: 'Charlie',
    votes: 22,
    link:'/123',
    comments:3,
    vote: function () {
    }
};

export default ArLink;