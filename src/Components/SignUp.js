import React, { Component, ProtoTypes } from 'react';
import { connect } from 'react-redux';
import { UserActions } from '../Actions/';

class SignUp extends React.Component {

    handleSignUp(event) {
      event.preventDefault();
      const { email, password } = this.refs
      this.props.dispatch(UserActions.signUp(email.value, password.value));
    }

    render() {

        const { signup } = this.props;
        const messagestyle = {
          height: 40, width: '100%', background: '#f7f7f7',marginTop: 20, display: 'flex', justifyContent: 'center', alignItems: 'center'
        }

        return (
            <div>
                <form className="form" autoComplete="off" onSubmit={(event) => this.handleSignUp(event)}>
                    <input ref="email" type="email" className="form-control" name="email" placeholder="Email" required />
                    <input ref="password" type="password" className="form-control" name="password" placeholder="Password" required />
                    <button type="submit" id="login-button">Sign up</button>
                </form>
                { signup.error
                  ?
                  <div style={messagestyle}>
                    <p style={{fontWeight: 600, color: 'red'}}>{signup.message}</p>
                  </div>
                  : null
                }
               { signup.success
                ?
                <div style={messagestyle}>
                  <p style={{fontWeight: 600, color: '#03996e'}}>{signup.message || 'User created'}</p>
                </div>
                : null
              }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    signup: state.user.signup
  }
}

const mapDispatchToProps = (dispatch, ownProps)  => {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
