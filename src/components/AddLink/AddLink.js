import React, {Component} from 'react';
import AddLinkForm from './AddLinkForm';

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

    render() {
        return (
            <div className="add-link">
                <h1>Please, add link</h1>
                <AddLinkForm onSubmit={this.submit}/>
            </div>
        );

    }
}

export default AddLink;