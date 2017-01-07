import * as types from '../Actions/types';

const initialState = {
    isUserLoggedIn: window.userLoggedIn
};

export default (state = initialState, action) => {
    switch (action.type) {
      case types.USER_LOGGED_OUT:
          return Object.assign({}, state, { isUserLoggedIn: false })
      case types.USER_LOGGED_IN:
        return Object.assign({}, state, { isUserLoggedIn: true })

      default: return state;
    }
};

