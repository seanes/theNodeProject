import axios from 'axios';
import * as types from './types';
import { browserHistory } from 'react-router';
import EventsActions from './EventsActions'

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

UserActions.getUserData = () => {
  return dispatch => {
    dispatch(UserActions.getProfile());
    dispatch(EventsActions.getEvents());
  }
}

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
    .catch(error => {
      dispatch(receivedData(types.ERROR_USER_LOGIN, error.response.data.message));
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
    .catch(error => {
      dispatch(receivedData(types.ERROR_USER_SIGNUP, error.response.data.message));
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

UserActions.forgotPw = (email) => {
  return dispatch => {
    const payLoad = {
      email
    };
    axios.post('/api/user/forgot', payLoad, {
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      dispatch(receivedData(types.SUCCESS_USER_FORGOT, response.data.message));
    })
    .catch(err => {
      dispatch(receivedData(types.ERROR_USER_FORGOT, err.response.data.message));
    })
  }
}

UserActions.changePw = (pw) => {
  return dispatch => {
    dispatch(receivedData(types.FETCHING_USER_RESETPW));
    const payLoad = {
      pw
    };
    axios.post('/api/user/reset', payLoad, {
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      dispatch(receivedData(types.SUCCESS_USER_RESETPW, response.data.message));
    })
    .catch(err => {
      dispatch(receivedData(types.ERROR_USER_RESETPW, err.response.data.message));
    })
  }
}

export default UserActions;


