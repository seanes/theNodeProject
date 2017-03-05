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

  handleDecline(eventId) {
    const { dispatch } = this.props
    dispatch(EventsActions.declineEvent(eventId));
  }

  render() {
    const { events, userId } = this.props
    return (
      <div>
        {
          events.map( event  => (
            <EventItem
              key={event._id} event={event}
              isParticipating={event.participants.indexOf(userId) > -1}
              handleParticipate={this.handleParticipate.bind(this)}
              handleDecline={this.handleDecline.bind(this)}
            />
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = state => {

  let userId = null

  if (state.user.profile && state.user.profile.userId) {
    userId = state.user.profile.userId
  }

  return {
    events: state.events.data,
    userId: userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getEvents: () => dispatch(EventsActions.getEvents()),
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);