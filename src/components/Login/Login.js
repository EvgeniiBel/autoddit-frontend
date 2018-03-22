import React, {Component} from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActiveSave:false
        };
    }

    inputName = (event) => {
        if (!!event.target.value.trim()) {
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

    render() {
        return (
            <div className="login">
                <h1>Please, input your name for continue</h1>
                <input type="text" onInput={this.inputName}/>
                <button disabled={!this.state.isActiveSave}>Save</button>
            </div>
        );

    }
}

export default Login;