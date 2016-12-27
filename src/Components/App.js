import React, { Component, PropTypes } from 'react';

export default class App extends Component {
    static PropTypes = {
        children: PropTypes.element.isRequired
    }

    render() {
        const { children } = this.props
        return (
            <div>
                <h1>The Node Project</h1>
                {children}
            </div>
        )
    }
};