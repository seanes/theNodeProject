import axios from 'axios';
import { browserHistory } from 'react-router';

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
    .then( response => {
      dispatch(receivedData('RECEIVED_EVENTS', response.data))
    })
    .catch( (response) => {
      // do something here
    })
  }
}

EventsActions.getLocations = () => {
  return function (dispatch) {
    axios.get('/api/locations')
    .then( response => {
      dispatch(receivedData('RECEIVED_LOCATIONS', response.data))
    })
    .catch( (response) => {
      // do something here
    })
  }
}

EventsActions.createEvent = data => {
  return function (dispatch) {
    axios.post('/api/events', data, {
      headers: {'Content-Type': 'application/json'}
    })
    .then( response => {
      console.log("event created", response.data)
      browserHistory.push('/events');
    })

  }
}

export default EventsActions;