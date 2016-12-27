const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'RECEIVED_EVENTS':
            return Object.assign({}, state, {
                events: action.payLoad
            });
        default: return state;
    }
};
