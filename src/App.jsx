import React, { Component } from 'react';
import { getName } from './userNames';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const name = getName();
  }

  render() {
    return <div>hello</div>;
  }
}

export default App;
