import React, {Component} from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActiveSave: false,
            login: null
        };
    }

    inputName = (event) => {
        const login = event.target.value.trim();
        if (!!login) {
            this.setState((state) => {
                state.login = login;
                return state;
            });
            if (!this.state.isActiveSave) {
                this.setState({
                    isActiveSave: true
                });
            }
        } else {
            if (this.state.isActiveSave) {
                this.setState({
                    isActiveSave: false
                });
            }
        }
    };

    setLogin = () => {
        this.props.setLogin(this.state.login);
        this.props.history.push('links');
    };

    render() {
        return (
            <div className="login">
                <Card>
                    <CardTitle title="Login Page" subtitle="Please, input your name to continue"/>
                    <CardText>
                        <TextField
                            hintText="Type your name..."
                            floatingLabelText="User name"
                            fullWidth={true}
                            multiLine={true}
                            onChange={this.inputName}
                        />
                    </CardText>
                    <CardActions>
                        <FlatButton disabled={!this.state.isActiveSave}
                                    onClick={this.setLogin}
                                    label="Log in"/>
                    </CardActions>
                </Card>
            </div>
        );

    }
}

export default Login;