import React, { Component, ProtoTypes } from 'react';

export default class SignUp extends React.Component {
    render() {
        return (
            <div>
                <form className="form" autoComplete="off" action="/api/user" method="post">
                    <input type="email" className="form-control" name="email" placeholder="Email" required />
                    <input type="password" className="form-control" name="password" placeholder="Password" required />
                    <button type="submit" id="login-button">Sign up</button>
                </form>
            </div>
        )
    }
}

