import React from 'react';
import { connect } from 'react-redux';
import EventForm from '../Components/EventForm'
import { EventsActions, UserActions } from '../Actions/'

class NewEvent extends React.Component {

  componentDidMount() {
    this.props.dispatch(EventsActions.getLocations());
  }

  handleCreateEvent(e, event) {
    e.preventDefault();
    this.props.dispatch(EventsActions.createEvent(event))
  }

  render() {

    const { locations } = this.props
    const eventTypes = ['Talk', 'Workshop', 'Party'];

    return (
      <div>
        <p>You are now creating a new event</p>
        { locations
          ? <EventForm
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