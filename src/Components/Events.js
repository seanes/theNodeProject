import React from 'react';
import { connect } from 'react-redux';

class Events extends React.Component {

  // TODO: fetch events and display them

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
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);