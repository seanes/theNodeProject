import React from 'react';
import { Link } from 'react-router';

class Home extends React.Component {

  render() {
    return (
      <div>
        <Link className="createEvent" to="/events/new/">+ Create event</Link>
      </div>
    )
  }
}

export default Home;