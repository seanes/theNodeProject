import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { UserActions } from '../Actions/';

class Login extends Component {

  handleLogin(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    const { email, password } = this.refs;
    dispatch(UserActions.login(email.value, password.value));
  }

  render() {
    return (
      <div>
        <form className="form" autoComplete="off" onSubmit={(event) => this.handleLogin(event)}>
          <input ref="email" type="email" className="form-control" name="email" placeholder="Username" />
          <input ref="password" type="password" className="form-control" name="pw" placeholder="Password" />
          <button type="submit" id="login-button">Login</button>
        </form>
        <Link to="/signup">Sign up</Link>
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    events: state.events.data,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);