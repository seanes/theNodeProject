import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { UserActions } from '../Actions/';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class Login extends Component {

  handleLogin(event) {
    event.preventDefault();
    const { email, password } = this.refs;
    this.props.dispatch(UserActions.login(email.getValue(), password.getValue()));
  }

  render() {

    const inputStyle = {
      width: '100%'
    }

    return (
      <div>
        <form className="login-form" autoComplete="off" onSubmit={(event) => this.handleLogin(event)}>
          <TextField
            id="email"
            ref="email"
            defaultValue={""}
            style={inputStyle}
            name="email"
            floatingLabelFixed
            floatingLabelText="E-mail"
          />
          <TextField
            id="password"
            style={inputStyle}
            ref="password"
            defaultValue={""}
            type="password"
            name="password"
            floatingLabelFixed
            floatingLabelText="Password"
          />
          <RaisedButton primary type="submit" id="login-button" onClick={this.handleLogin.bind(this)} label="Login"/>
        </form>
        <div style={{marginTop: 20}}>
          <Link to="/forgot" style={{marginRight: 20}}>Forgot password?</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    events: state.events.data,
  }
};

export default connect(mapStateToProps)(Login);