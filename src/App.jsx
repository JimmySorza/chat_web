import React, { Component } from 'react';
import { getName } from './userNames';
import { getCurrentPot, sendNameToServer } from './socket';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const name = getName();

    getCurrentPot(dispatch);

    dispatch({type: 'ASSIGNED_USERNAME', name});
    sendNameToServer(name)
  }

  render() {
    return <div>hello</div>;
  }
}

export default App;
