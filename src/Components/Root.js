import React, { Component, PropTypes } from 'react';
import { Route, IndexRoute, Router } from 'react-router';
import App from './App';
import Home from './Home';
import Login from './Login';

export default class Root extends Component {

    static PropTypes = {
        history: PropTypes.object.isRequired
    }

    render() {
        const { history } = this.props

        const routes = (
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path={'/login'} component={Login}/>
            </Route>
        )

        return (
            <Router routes={routes} history={history}/>
        )
    }
};