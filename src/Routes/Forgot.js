import React, { Component, ProtoTypes } from 'react';
import { connect } from 'react-redux';
import { UserActions }  from '../Actions/';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Forgot extends React.Component {

  handleForgot(event) {
    event.preventDefault();
    const email = this.refs.email.input.value;
    this.props.dispatch(UserActions.forgotPw(email));
  }

  render() {

    const { forgot } = this.props;
    const styles = {
      form: {
        display: 'table-caption',
      },
      success: {
        color: 'green',
      },
      error: {
        color: 'red',
      }
    }

    return (
      <div>
        <form className="form" autoComplete="off" style={styles.form} onSubmit={(event) => this.handleForgot(event, this.props.email)}>
          <TextField
            ref="email"
            floatingLabelText="Email"
            floatingLabelFixed={true}
            value={this.props.email}
            type="email"
            errorText={forgot.message}
            errorStyle={forgot.success ? styles.success : {}}
            floatingLabelStyle={forgot.success ? styles.success : {}}
          />
          <RaisedButton type="submit" label="Reset password" primary={true} />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    forgot: state.user.forgot
  }
}

export default connect(mapStateToProps)(Forgot);
