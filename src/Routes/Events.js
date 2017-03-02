import React from 'react';
import { connect } from 'react-redux';
import { EventsActions } from '../Actions/';
import EventItem from '../Components/EventItem'

class Events extends React.Component {

  componentWillMount() {
    const {  getEvents } = this.props
    getEvents();
  }

  render() {
    const { events } = this.props
    return (
      <div>
        {
          events.map( event  => (
            <EventItem key={event.id} event={event} />
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    events: state.events.data
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getEvents: () => dispatch(EventsActions.getEvents())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);