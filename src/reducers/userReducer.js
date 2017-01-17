import * as types from '../Actions/types';

const initialState = { };

export default (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOGGED_OUT:
      return Object.assign({}, state, { isUserLoggedIn: false })
    case types.USER_LOGGED_IN:
      return Object.assign({}, state, { isUserLoggedIn: true })
    case types.SUCCESS_USER_SIGNUP:
      return Object.assign({}, state, { signup: { error: false, message: action.payLoad, success: true } })
    case types.ERROR_USER_SIGNUP:
      return Object.assign({}, state, { signup: { error: true, message: action.payLoad, success: false } })
    case types.RECEIVED_USER_PROFILE:
      return Object.assign({}, state, { profile: action.payLoad })

    default: return state;
  }
};

