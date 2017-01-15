import axios from 'axios';
import * as types from './types';
import { browserHistory } from 'react-router';

const receivedData = (type, data) => {
  return {
    type: type,
    payLoad: data
  }
};

var RestActions = {};

RestActions.logout = () => {
  return dispatch => {
    axios.post('logout')
    .then( response => {
      dispatch(receivedData(types.USER_LOGGED_OUT, null));
    })
    .catch( response => {
      console.log('error', response);
    })
  }
};

RestActions.login = (email, password) => {
  return dispatch => {
    const payLoad = {
      email: email,
      password: password
    };
    axios.post('/api/user/login', payLoad, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => {
      dispatch(receivedData(types.USER_LOGGED_IN, null));
      browserHistory.push('/');
    })
    .catch( response => {
      console.log('error', response);
    })
  }
};

RestActions.signUp = (email, password) => {
  return dispatch => {
    const payLoad = {
      email: email,
      password: password
    };
    axios.post('/api/user/', payLoad, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => {
      console.log(response)
      dispatch(receivedData(types.SUCCESS_USER_SIGNUP, null));
      browserHistory.push('/login');
    })
    .catch( response => {
      dispatch(receivedData(types.ERROR_USER_SIGNUP, response.message));
    })
  }
};

export default RestActions;


