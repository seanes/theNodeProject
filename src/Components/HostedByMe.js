import React from 'react';

class HostedByMe extends React.Component {

  render() {

    const { profile, events } = this.props

    if (!profile) return null

    const myHostedEvents = events.filter( event => event.hosts.map( host => host._id).indexOf(profile._id) > -1)

    return (
      <div>
        <div>Events I am hosting: </div>
        <div>
          {
            myHostedEvents.length
              ? ( <ol>
                { myHostedEvents.map( (event) => <li key={event._id}>{event.event_name}</li>) }
              </ol> )
              : <p>You are not hosting any events</p>
          }
        </div>
      </div>
    )

  }
}

export default HostedByMe;