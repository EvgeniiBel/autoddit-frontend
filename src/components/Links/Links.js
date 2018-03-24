import React, {Component} from 'react';
import {ArLink} from '../../components/arLink';

//material
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Card} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import './Links.css';

const style = {
    addLink: {
        position: 'fixed',
        right: '30px',
        bottom: '20px'
    }
};


class Main extends Component {
    state = {
        open: false,
        comment: '',
        linkId: null,
        linkIndex: null,
        parentWay: null
    };

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

    addCommentChange = (event, value) => {
        this.setState({
            comment: value
        });
    };

    handleOpen = (linkId, linkIndex, parentWay) => {
        this.setState({
            open: true,
            comment: '',
            linkId,
            linkIndex,
            parentWay
        });
    };

    handleOpenWithComment = (linkId, linkIndex, parentWay, id) => {
        parentWay = !!parentWay ? `${parentWay}/${id}` : `${id}`;
        this.handleOpen(linkId, linkIndex, parentWay);
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSaveComment = () => {
        this.handleClose();
        this.props.addComment({
            username: this.props.login,
            linkId: this.state.linkId,
            linkIndex: this.state.linkIndex,
            parentWay: this.state.parentWay,
            commentText: this.state.comment
        });
    };

    renderDialogActions = () => {
        return [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Save"
                primary={true}
                disabled={!this.state.comment.trim()}
                onClick={this.handleSaveComment}
            />
        ];
    };

    render() {
        let {login, links, voteForLink, voteForComment, getCommentsForLink} = this.props;
        return (
            <div className="links">
                <Dialog
                    title="Add Comment"
                    actions={this.renderDialogActions()}
                    modal={true}
                    contentClassName="add-comment-dialog"
                    open={this.state.open}
                >
                    <TextField
                        hintText="Type your comment..."
                        floatingLabelText="Your new comment"
                        fullWidth={true}
                        multiLine={true}
                        onChange={this.addCommentChange}
                    />
                </Dialog>
                <Card>
                    <div className="links__container">
                        <FloatingActionButton
                            tooltip="Ligature"
                            onClick={this.goToAddLink}
                            style={style.addLink}>
                            <ContentAdd/>
                        </FloatingActionButton>
                        {links && links.length > 0 && <div className="links-list">
                            {links.map((link, index) =>
                                <ArLink key={`${link.submittedData}${index}`}
                                        {...link}
                                        index={index}
                                        login={login}
                                        vote={voteForLink}
                                        voteForComment={voteForComment}
                                        addComment={this.handleOpen}
                                        addCommentToComment={this.handleOpenWithComment}
                                        getComments={getCommentsForLink}/>)}
                        </div>}
                    </div>
                </Card>
            </div>
        );

    }
}

export default Main;