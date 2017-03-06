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

    case 'UPDATE_EVENT':
      const updatedEvent = action.payLoad
      let data  = state.data.slice()
      return Object.assign({}, state, {
        data: data.map( event => {
          if (event._id === updatedEvent._id) {
            return updatedEvent
          }
          return event
        })
      })

    default: return state;
  }
};
