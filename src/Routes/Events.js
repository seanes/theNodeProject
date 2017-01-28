import React from 'react';
import { connect } from 'react-redux';
import { EventsActions } from '../Actions/';

class Events extends React.Component {

  componentWillMount() {
    const { events, getEvents } = this.props
    if (!events || !events.length) {
      getEvents();
    }
  }

  render() {
    const { events } = this.props
    return (
      <div>
        Events { events ? events.length : null }
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