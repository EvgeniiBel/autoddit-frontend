import React, {Component} from 'react';
import {ArLink} from '../../components/arLink';

//material
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class Main extends Component {
    state = {
        open: false,
        comment:'',
        linkId:null,
        linkIndex:null,
        parentWay:null
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
            comment:value
        });
    };

    handleOpen = (linkId, linkIndex, parentWay) => {
        this.setState({
            open: true,
            comment:'',
            linkId,
            linkIndex,
            parentWay
        });
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSaveComment = () => {
        this.handleClose();
        this.props.addComment({
            username:this.props.login,
            linkId:this.state.linkId,
            linkIndex:this.state.linkIndex,
            parentWay:this.state.parentWay,
            commentText:this.state.comment
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
        let {login, links, voteForLink, getCommentsForLink} = this.props;
        return (
            <div className="main">
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
                <RaisedButton label="Add Link" onClick={this.goToAddLink}/>
                {links && links.length > 0 && <div className="links-list">
                    {links.map((link, index) =>
                        <ArLink key={`${link.submittedData}${index}`}
                                {...link}
                                index={index}
                                login={login}
                                vote={voteForLink}
                                addComment={this.handleOpen}
                                getComments={getCommentsForLink}/> )}
                </div>}
            </div>
        );

    }
}

export default Main;