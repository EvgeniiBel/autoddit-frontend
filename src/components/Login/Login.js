import React, {Component} from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActiveSave:false,
            login:null
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
                    isActiveSave:true
                });
            }
        } else {
            if (this.state.isActiveSave) {
                this.setState({
                    isActiveSave:false
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
                <h1>Please, input your name to continue</h1>
                <input type="text" onInput={this.inputName}/>
                <button disabled={!this.state.isActiveSave} onClick={this.setLogin}>Save</button>
                {this.props.login}
            </div>
        );

    }
}

export default Login;