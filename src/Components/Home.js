import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { EventsActions, UserActions } from '../Actions/';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import NoUser from 'file!../static/no_user.png';
import { imageToBase64 } from '../utils/imageUtils';

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch, isUserLoggedIn } = this.props;

    if (isUserLoggedIn) {
      dispatch(EventsActions.getEvents());
      dispatch(UserActions.getProfile());
    }
  }

  handleLogOut() {
    const { dispatch } = this.props;
    dispatch(UserActions.logout());
    browserHistory.push('/login');
  }

  /* TODO: Implement this */
  handleChangeProfileImg(event) {
    const file = event.target.files[0];
    imageToBase64(file, (response) => {
      console.log(response)
    });

    /* TODO:
      1. keep image as base64 string
      2. create action to update user profile with new image
     */
  }

  render() {
    const { isUserLoggedIn, profile } = this.props;
    return (
      <div>
        <h3>{isUserLoggedIn ? "You are logged in" : "You are logged out"}</h3>
        { profile
          ? <div>
            <p>Name { profile.name }</p>
            <p>Karma {profile.karma}</p>
            <img style={{background: 'grey', width: 200, height: 200}} src={profile.profile_img || NoUser}/>
            <input type="file" onChange={this.handleChangeProfileImg.bind(this)}/>
            </div>
          : null
        }
        { isUserLoggedIn
          ? <div>
              <Link to="/events">View all events</Link>
              <button style={{display: 'block', marginTop: 10}} onClick={() => this.handleLogOut()}>Log out</button>
          </div>
          : <Link to="/login">Log in</Link>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    events: state.events.data,
    isUserLoggedIn: state.user.isUserLoggedIn,
    profile: state.user.profile
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);