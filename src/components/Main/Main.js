import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import {Links} from '../Links';
import {Login} from '../Login';
import {AddLink} from '../AddLink';

class Main extends Component {
    render() {
        return (
            <div className="main">
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/links' component={Links}/>
                    <Route path='/add' component={AddLink}/>
                    <Route path="*" component={Login}/>
                </Switch>
            </div>
        );

    }
}

export default Main;