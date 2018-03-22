import React from 'react';
import './Layout.css';

const Layout = (props) => {
    return (
        <div className="layout">
            <div className="layout__navbar">
                <h1 className="App-title">Welcome to Autodesc Reddit</h1>
            </div>
            <div className="layout__content">
                {props.children}
            </div>
        </div>
    );
};

export default Layout;