const initialState = {
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVED_EVENTS':
      return Object.assign({}, state, {
        data: action.payLoad
      });
    default: return state;
  }
};
