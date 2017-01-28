import React, { Component, PropTypes } from 'react';

class App extends Component {

  static PropTypes = {
    children: PropTypes.element.isRequired
  }

  render() {
    const { children } = this.props
    return (
      <div>
        { children }
      </div>
    )
  }
};

export default App;