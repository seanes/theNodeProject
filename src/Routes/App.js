import React, { PropTypes } from 'react';
import { MuiThemeProvider } from 'material-ui';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { connect } from 'react-redux';
import { EventsActions, UserActions } from '../Actions/';

class App extends React.Component {

  static PropTypes = {
    children: PropTypes.element.isRequired
  }

  componentWillMount() {
    const { isUserLoggedIn, getUserData } = this.props;

    if (isUserLoggedIn) {
      getUserData();
    }
  }


  render() {

    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: '#1A75BC',
        primary2Color: '#1A75BC',
        primary3Color: '#1A75BC',
      },
    }, {});

    const { children, isUserLoggedIn, profile, dispatch } = this.props

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Header isUserLoggedIn={isUserLoggedIn} profile={profile} dispatch={dispatch} />
          <div className="app">{ children }</div>
          <Footer/>
        </div>
      </MuiThemeProvider>
    )
  }
};

const mapStateToProps = state => {
  return {
    isUserLoggedIn: state.user.isUserLoggedIn,
    profile: state.user.profile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserData: () => dispatch(UserActions.getUserData()),
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);