import React from 'react';
import { connect } from 'react-redux';
import NewEventForm from '../Components/NewEventForm'
import { EventsActions } from '../Actions/'

class NewEvent extends React.Component {

  componentDidMount() {
    this.props.dispatch(EventsActions.getLocations());
  }

  handleCreateEvent(e, newEvent) {
    e.preventDefault();
    //this.props.dispatch(EventsActions.createEvent())
  }

  render() {

    const { locations } = this.props
    const eventTypes = ['Workshop', 'Party', 'Lecture', 'Kick-off', 'Get-together'];

    return (
      <div>
        <p>You are now creating a new event</p>
        { locations
          ? <NewEventForm
              eventTypes={eventTypes}
              locations={locations}
              handleCreateEvent={this.handleCreateEvent.bind(this)}
          />
          : null
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  locations: state.events.locations
})

export default connect(mapStateToProps)(NewEvent);