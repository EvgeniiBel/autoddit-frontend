import React, {Component} from 'react';
import {ArLink} from '../../components/arLink';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.login) {
            this.props.history.push('login');
        }
        this.props.getLinks();
    }

    render() {
        let {login, links, voteForLink, getCommentsForLink} = this.props;
        return (
            <div className="main">
                {links && links.length > 0 && <div className="links-list">
                    {links.map((link, index) =>
                        <ArLink key={`${link.submittedData}${index}`}
                                {...link}
                                index={index}
                                login={login}
                                vote={voteForLink}
                                getComments={getCommentsForLink}/> )}
                </div>}
            </div>
        );

    }
}

export default Main;