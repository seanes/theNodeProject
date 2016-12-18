import React, { Component, PropTypes } from 'react';

export default class Login extends Component {

    render() {
        return (
            <div>
                <form className="form" autoComplete="off" action="/api/user/login" method="post">
                    <input type="email" className="form-control" name="email" placeholder="Username" defaultValue />
                    <input type="password" className="form-control" name="pw" placeholder="Password" defaultValue />
                    <button type="submit" id="login-button" value="login" />
                </form>
            </div>
        )
    }
};