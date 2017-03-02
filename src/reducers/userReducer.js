import * as types from '../Actions/types';

const initialState = { };

export default (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOGGED_OUT:
      return Object.assign({}, state, { isUserLoggedIn: false });
    case types.USER_LOGGED_IN:
      return Object.assign({}, state, { isUserLoggedIn: true, login: { error: false, success: true, message: '' } });
    case types.SUCCESS_USER_SIGNUP:
      return Object.assign({}, state, { signup: { error: false, message: action.payLoad, success: true } });
    case types.ERROR_USER_SIGNUP:
      return Object.assign({}, state, { signup: { error: true, message: action.payLoad, success: false } });
    case types.RECEIVED_USER_PROFILE:
      return Object.assign({}, state, { profile: action.payLoad })
    case types.SUCCESS_USER_FORGOT:
      return Object.assign({}, state, { forgot: { error: false, message: action.payLoad, success: true } })
    case types.ERROR_USER_FORGOT:
      return Object.assign({}, state, { forgot: { error: true, message: action.payLoad, success: false } })
    case types.FETCHING_USER_RESETPW:
        return Object.assign({}, state, { reset: { diableBtn: true } })
    case types.SUCCESS_USER_RESETPW:
      return Object.assign({}, state, { reset: { error: false, message: '', success: true, diableBtn: false } })
    case types.ERROR_USER_RESETPW:
      return Object.assign({}, state, { reset: { error: true, message: action.payLoad, success: false, diableBtn: false } })
    case types.ERROR_USER_LOGIN:
      return Object.assign({}, state, { login: { error: true, message: action.payLoad, success: false }})
    default: return state;
  }
};

