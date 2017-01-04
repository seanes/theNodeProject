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
  return function(dispatch) {
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
  return function(dispatch) {

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
}

export default RestActions;


