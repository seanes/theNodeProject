import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';


class EventItem extends React.Component {

  render() {

    const { event } = this.props

    const availableSpots = event.capacity - event.participants.length
    const deadlineIsReached = new Date(event.participation_deadline) < Date.now()

    return (
      <div className="event-item">
        <div className="title"> { event.event_name } </div>
        <div> { event.description } </div>
        <div className="date"> { new Date(event.event_date).toString() } </div>
        <div> { event.event_type } </div>
        <div> { availableSpots }  of { event.capacity } available spots </div>
        <div>
          <RaisedButton disabled={!availableSpots || deadlineIsReached} label="Participate" primary={true} />
        </div>
      </div>
    )
  }
}

export default EventItem;