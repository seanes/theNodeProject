const initialState = {
  data: []
};

export default (state = initialState, action) => {

  switch (action.type) {

    case 'RECEIVED_EVENTS':
      return Object.assign({}, state, {
        data: action.payLoad
      });

      case 'RECEIVED_LOCATIONS':
      return Object.assign({}, state, {
        locations: action.payLoad
      });

    default: return state;
  }
};
