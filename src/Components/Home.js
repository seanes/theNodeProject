import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { EventsActions } from '../Actions/';
import { Link } from 'react-router';


class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(EventsActions.getEvents());
    }

    render() {
        const { events } = this.props;
        return (
            <div>
                <h3>Events</h3>
                <ol>
                    { events && events.map( (event, i) => (
                        <li key={'event'+i}>{event.event_name}</li>
                    ))}
                </ol>
                <Link to="/login">Log in</Link>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        events: state.eventsReducer.events
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);