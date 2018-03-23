import React, {Component} from 'react';
import './App.css';

import {Provider} from "react-redux";
import {applyMiddleware, createStore, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {Layout} from './components/Layout';
import {LinksReducer, LinksSaga} from './components/Links';
import {LoginReducer} from './components/Login';
import {Main} from './components/Main';

import {reducer as formReducer} from 'redux-form';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


//create store
const AppReducers = combineReducers({
    LinksReducer,
    LoginReducer,
    form: formReducer
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
                    <MuiThemeProvider>
                        <Layout>
                            <Main/>
                        </Layout>
                    </MuiThemeProvider>
                </Provider>
            </div>
        );
    }
}

export default App;
