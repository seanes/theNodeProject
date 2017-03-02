import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import { UserActions } from '../Actions/'
import NoUser from 'file!../static/images/no_user.png';
import Badge from 'material-ui/Badge';
import { browserHistory } from 'react-router';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  toggleMenu(show) {
    this.setState({
      open: show
    });
  }

  handleLogOut() {
    this.props.dispatch(UserActions.logout())
    this.setState({
      open: false
    });
  }

  handleNavigateToProfile() {
    browserHistory.push('/profile');
    this.setState({
      open: false
    });
  }

  render() {

    const style = {
      position: 'absolute',
      right: 15,
      top: 0
    }

    const { isUserLoggedIn, profile } = this.props;

    const getKarmaColor = () => {

      if (!profile) return '#000'

      switch (true) {
        case profile.karma == 1: return '#cc0000';
        case profile.karma < 3: return '#ff8000';
        default: return '#75bc1a';
      }
    }

    return (
      <div className="header">
        <div className="title"> The Node Project</div>
        {
          isUserLoggedIn
          ?
            <div style={style}>
              <IconButton
                iconStyle={{color: '#fff'}}
                onClick={() => { this.toggleMenu(true) }}
              >
                { profile
                  ? <div>
                    <img className="profile" src={profile.profile_img || NoUser}/>
                    <Badge
                      badgeStyle={{top: 2, right: 20, backgroundColor: getKarmaColor(), color: '#fff'}}
                      badgeContent={profile.karma}
                      style={{position: 'initial'}}
                    />
                  </div>
                  : null
                }
              </IconButton>
              <Drawer width={200} openSecondary={true} open={this.state.open} >
                <AppBar title="Menu" onClick={() => { this.toggleMenu(false)}} />
                <MenuItem onTouchTap={ this.handleNavigateToProfile.bind(this) }>Profile</MenuItem>
                <MenuItem onTouchTap={ this.handleLogOut.bind(this) }>Log out</MenuItem>
              </Drawer>
            </div>
            : null
        }
      </div>
    )
  }
}


export default Header;
