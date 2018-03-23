import React, {Component} from 'react';
import {ArLink} from '../../components/arLink';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        if (!this.props.login) {
            this.props.history.push('login');
        } else {
            this.props.getLinks();
        }
    };

    goToAddLink = () => {
        this.props.history.push('add');
    };

    startAddingComment = () => {

    };

    render() {
        let {login, links, voteForLink, getCommentsForLink} = this.props;
        return (
            <div className="main">
                <button onClick={this.goToAddLink}>Add Link</button>
                {links && links.length > 0 && <div className="links-list">
                    {links.map((link, index) =>
                        <ArLink key={`${link.submittedData}${index}`}
                                {...link}
                                index={index}
                                login={login}
                                vote={voteForLink}
                                addComment={this.startAddingComment}
                                getComments={getCommentsForLink}/> )}
                </div>}
            </div>
        );

    }
}

export default Main;