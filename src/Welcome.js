import React from 'react';

import celsius_logo from './resources/logo.png';

class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }

    

    render() {
        return (
            <img src={celsius_logo} className="App-logo" />
        );
    }
}


export default Welcome;
