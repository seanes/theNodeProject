import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Login extends Component {

    render() {
        return (
            <div>
                <form className="form" autoComplete="off" action="/api/user/login" method="post">
                    <input type="email" className="form-control" name="email" placeholder="Username" />
                    <input type="password" className="form-control" name="pw" placeholder="Password" />
                    <button type="submit" id="login-button">Login</button>
                </form>
                <Link to="/signup">Sign up</Link>
            </div>
        )
    }
};