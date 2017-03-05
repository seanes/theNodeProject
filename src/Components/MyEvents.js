import React from 'react';

class MyEvents extends React.Component {

  render() {

    const { profile, events } = this.props

    if (!profile) return null

    const myEvents  = events.filter( event => event.participants.indexOf(profile.userId) > -1)

    return (
      <div>
        <div>My events: </div>
        <div>
          {
            myEvents.length
            ? ( <ol>
                { myEvents.map( (event) => <li key={event._id}>{event.event_name}</li>) }
              </ol> )
            : <p>You are not attending any events</p>
          }
        </div>
      </div>
    )
  }
}

export default MyEvents;