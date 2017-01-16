import React, { Component, PropTypes } from 'react';

export default class App extends Component {
    static PropTypes = {
        children: PropTypes.element.isRequired
    }

    render() {
        // TODO : implement header and footer
        const { children } = this.props
        return (
            <div>
                {children}
            </div>
        )
    }
};