import React, { Component, ProtoTypes } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import { UserActions }  from '../Actions/';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class ResetPassword extends React.Component {

  handleChangePassword(event) {
    event.preventDefault();
    const pw = this.refs.pw.input.value;
    this.props.dispatch(UserActions.changePw(pw));
  }

  render() {

    const { reset } = this.props;
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
        <form className="form" autoComplete="off" style={styles.form} onSubmit={(event) => this.handleChangePassword(event)}>
          <TextField
            ref="pw"
            floatingLabelText="Enter a new password"
            type="text"
            errorText={reset.message}
            errorStyle={reset.success ? styles.success : {}}
            floatingLabelStyle={reset.success ? styles.success : {}}
          />
          {
            reset.success ?
              <Link to="/">
                <RaisedButton  
                  type="submit"
                  label="Go back to home"
                  primary={true}
                />
              </Link> :
              <RaisedButton 
                disabled={reset.diableBtn}
                type="submit"
                label="Change password"
                primary={true}
              />
          }
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    reset: state.user.reset
  }
}

export default connect(mapStateToProps)(ResetPassword);
