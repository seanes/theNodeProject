import React from 'react';
import { connect } from 'react-redux';
import MyEvents from '../Components/MyEvents.js'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { browserHistory } from 'react-router';
import MdEvent from 'material-ui/svg-icons/action/event';
import FlatButton from 'material-ui/FlatButton';

class Home extends React.Component {

  render() {
    return (
      <div>
        <MyEvents profile={this.props.profile} events={this.props.events} />
        <FlatButton
          icon={<MdEvent/>}
          label="Events"
          onClick={ () => browserHistory.push('/events/')}
        />
        <FloatingActionButton mini onClick={() => browserHistory.push('/events/new/')}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    events: state.events.data,
    profile: state.user.profile
  }
}

export default connect(mapStateToProps)(Home);


