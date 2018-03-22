import React, {Component} from 'react';
import {ArLink} from '../../components/arLink';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getLinks();
    }

    render() {
        let {links} = this.props;
        return (
            <div className="main">
                {links && links.length > 0 && <div className="links-list">
                    {links.map((link, index) => <ArLink key={`${link.submittedData}${index}`} {...link} vote={this.props.voteForLink}/>)}
                </div>}
            </div>
        );

    }
}

export default Main;