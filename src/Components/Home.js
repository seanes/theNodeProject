import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { EventsActions, RestActions } from '../Actions/';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { dispatch, isUserLoggedIn } = this.props;

        if (isUserLoggedIn) {
            dispatch(EventsActions.getEvents());
        }
    }

    handleLogOut() {
        const { dispatch } = this.props;
        dispatch(RestActions.logout());
        browserHistory.push('/login');
    }

    render() {
        const { events, isUserLoggedIn } = this.props;
        return (
            <div>
                <h3>{isUserLoggedIn ? "You are logged in" : "You are logged out"}</h3>
                <ol>
                    { events && events.map( (event, i) => (
                        <li key={'event'+i}>{event.event_name}</li>
                    ))}
                </ol>
              { isUserLoggedIn
                  ? <button onClick={() => this.handleLogOut()}>Log out</button>
                  : <Link to="/login">Log in</Link>
              }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        events: state.eventsReducer.events,
        isUserLoggedIn: state.userReducer.isUserLoggedIn
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);