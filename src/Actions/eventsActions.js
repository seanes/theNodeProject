import axios from 'axios';

var EventsActions = {};

const receivedData = (type, data) => {
    return {
        type: type,
        payLoad: data
    }
};

EventsActions.getEvents = () => {
    return function (dispatch) {
        axios.get('/api/events')
            .then( (response) => {
                dispatch(receivedData('RECEIVED_EVENTS', response.data))
            })
            .catch( (response) => {
              // do something here
            })
    }
}

export default EventsActions;