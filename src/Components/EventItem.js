import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';


class EventItem extends React.Component {

  render() {

    const { event, handleParticipate, isParticipating, handleDecline } = this.props

    const availableSpots = event.capacity - event.participants.length
    const deadlineIsReached = new Date(event.participation_deadline) < Date.now()

    return (
      <div className="event-item">
        <div className="title"> { event.event_name } </div>
        <div> { event.description } </div>
        <div className="date"> { new Date(event.event_date).toString() } </div>
        <div> { event.event_type } </div>
        <div> { availableSpots }  of { event.capacity } free spots </div>
        <div>
          { !isParticipating
            ? <RaisedButton
                disabled={!availableSpots || deadlineIsReached}
                label="Participate"
                primary={true}
                onClick={ () => handleParticipate(event._id) }
            />
            : <RaisedButton
                disabled={deadlineIsReached}
                label="Decline"
                secondary={true}
                onClick={ () => handleDecline(event._id) }
            />
          }

        </div>
      </div>
    )
  }
}

export default EventItem;