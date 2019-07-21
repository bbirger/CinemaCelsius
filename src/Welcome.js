import React from 'react';

import celsius_logo from './resources/logo.png';

class Welcome extends React.Component {

    render() {
        return (
            <img src={celsius_logo} className="App-logo" alt="Cinema Celsius" />
        );
    }
}


export default Welcome;
