import React, { Component, PropTypes } from 'react';
import {
  MuiThemeProvider,
} from 'material-ui';

class App extends Component {

  static PropTypes = {
    children: PropTypes.element.isRequired
  }

  render() {
    const { children } = this.props
    return (
      <MuiThemeProvider>
        <div>
          { children }
        </div>
      </MuiThemeProvider>
    )
  }
};

export default App;