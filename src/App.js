import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import {ArLink} from './components/arLink';
import {ArComment} from './components/arComment';

const comments = [
    {
        username:'Jenya',
        commentText: 'Developer',
        comments:[{
            username:'Yuval',
            commentText: 'SEO'
        }]
    },
    {
        username:'Greg',
        commentText: 'Teamleader'
    }
];

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to Autodesc Reddit</h1>
                </header>
                <div className="App-intro">
                    <ArLink comments={comments}/>
                </div>
            </div>
        );
    }
}

export default App;
