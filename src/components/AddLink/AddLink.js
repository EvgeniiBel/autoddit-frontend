import React, {Component} from 'react';
import AddLinkForm from './AddLinkForm';

import {Card, CardText, CardTitle} from 'material-ui/Card';

import './AddLink.css';

class AddLink extends Component {
    componentDidMount() {
        if (!this.props.username) {
            this.props.history.push('login');
        }
    }

    submit = (values) => {
        let {title, link, imageUrl} = values;
        let {username} = this.props;
        this.props.addLink({
            title,
            link,
            imageUrl,
            username
        });
        this.props.history.push('links');
    };

    cancelAddLink = () => {
      this.props.history.push('links')  ;
    };

    render() {
        return (
            <div className="add-link">
                <Card>
                    <CardTitle title="Add Link" subtitle="Please, add link for your usage..."/>
                    <CardText>
                        <AddLinkForm onSubmit={this.submit} cancelAddLink={this.cancelAddLink}/>
                    </CardText>
                </Card>
            </div>
        );

    }
}

export default AddLink;