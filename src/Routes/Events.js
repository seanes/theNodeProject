import React from 'react';
import { connect } from 'react-redux';
import { EventsActions } from '../Actions/';
import EventItem from '../Components/EventItem'

class Events extends React.Component {

  componentWillMount() {
    const {  getEvents } = this.props
    getEvents();
  }

  handleParticipate(eventId) {
    const { dispatch } = this.props
    dispatch(EventsActions.participateForEvent(eventId));
  }

  render() {
    const { events } = this.props
    return (
      <div>
        {
          events.map( event  => (
            <EventItem
              key={event._id} event={event}
              handleParticipate={this.handleParticipate.bind(this)}
            />
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
    getEvents: () => dispatch(EventsActions.getEvents()),
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);