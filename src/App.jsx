import React, { Component } from 'react';
import { getName } from './userNames';
import { getCurrentPot, sendGetOneToServer, sendNameToServer } from './socket';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const name = getName();

    getCurrentPot(dispatch);

    dispatch({type: 'ASSIGNED_USERNAME', name});
    sendNameToServer(name)
  }

  closeSnackbar = () => this.props.dispatch({type: 'ANOTHER_ONE_PITCHED_IN'});

  getOne = () => {
    const { dispatch, name } = this.props;
    dispatch({
      type: 'GET_ONE'
    });
    sendGetOneToServer(name)
  };

  render() {
    return <div>hello</div>;
  }
}

export default App;
