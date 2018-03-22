import React, {Component} from 'react';
import './App.css';

import {Provider} from "react-redux";
import {applyMiddleware, createStore, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {Layout} from './components/Layout';
import {Links, LinksReducer, LinksSaga} from './components/Links';
import {Login, LoginReducer} from './components/Login';
import {Main} from './components/Main';

//create store
const AppReducers = combineReducers({
    LinksReducer,
    LoginReducer
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    AppReducers,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(LinksSaga);


class App extends Component {
    render() {
        return (
            <div className="App">
                <Provider store={store}>
                    <Layout>
                        <Main/>
                    </Layout>
                </Provider>
            </div>
        );
    }
}

export default App;
