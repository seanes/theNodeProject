import axios from 'axios';
import * as types from './types';
import { browserHistory } from 'react-router';

const receivedData = (type, data) => {
  return {
    type: type,
    payLoad: data
  }
};

var UserActions = {};

UserActions.logout = () => {
  return dispatch => {
    axios.post('logout')
    .then(response => {
      dispatch(receivedData(types.USER_LOGGED_OUT, null));
      browserHistory.push('/login');
    })
    .catch(response => {
      console.log('error', response);
    })
  }
};

UserActions.updateProfile = payLoad => {

  return dispatch => {

    axios.post('/api/me', payLoad, {
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      dispatch(UserActions.getProfile())
    })
    .catch(response => {
      console.log('error', response);
    })
  }
}

UserActions.login = (email, password) => {
  return dispatch => {
    const payLoad = {
      email: email,
      password: password
    };
    axios.post('/api/user/login', payLoad, {
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      dispatch(receivedData(types.USER_LOGGED_IN, null));
      dispatch(UserActions.getProfile())
      browserHistory.push('/');
    })
    .catch(response => {
      console.log('error', response);
      alert('Incorrect username or password');
    })
  }
};

UserActions.signUp = (email, password) => {
  return dispatch => {
    const payLoad = {
      email: email,
      password: password
    };
    axios.post('/api/user/', payLoad, {
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      dispatch(receivedData(types.SUCCESS_USER_SIGNUP, response.message));
    })
    .catch(response => {
      dispatch(receivedData(types.ERROR_USER_SIGNUP, response.message));
    })
  }
};

UserActions.getProfile = () => {
  return dispatch => {
    axios.get('/api/me')
    .then(response => {
      dispatch(receivedData(types.RECEIVED_USER_PROFILE, response.data))
    })
    .catch(response => {
      console.log("error", response)
    })
  }
};

export default UserActions;


