import React from 'react';


class Event extends React.Component {
  render() {
    const { eventId } = this.props.params;

    return (
      <div>You are viewing an event with id {eventId}!</div>
    )
  }
}

export default Event;