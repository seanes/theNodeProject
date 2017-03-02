import React, { Component, ProtoTypes } from 'react';
import { connect } from 'react-redux';
import { UserActions } from '../Actions/';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import UserFeedback from '../Components/UserFeedback'


class SignUp extends React.Component {

  handleSignUp(event) {
    event.preventDefault();
    const { email, password } = this.refs
    this.props.dispatch(UserActions.signUp(email.getValue(), password.getValue()));
  }

  render() {

    const { signup } = this.props;

    return (
      <div>
        <form className="login-form" autoComplete="off" onSubmit={ event => this.handleLogin(event)}>
          <TextField
            id="email"
            ref="email"
            defaultValue={""}
            fullWidth={true}
            name="email"
            floatingLabelFixed
            floatingLabelText="E-mail"
          />
          <TextField
            id="password"
            fullWidth={true}
            ref="password"
            defaultValue={""}
            type="password"
            name="password"
            floatingLabelFixed
            floatingLabelText="Password"
          />
          <RaisedButton primary type="submit" id="signup-button" onClick={ event => this.handleSignUp(event)} label="Sign up"/>
          <UserFeedback feedBack={signup} />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    signup: state.user.signup
  }
}

export default connect(mapStateToProps)(SignUp);
