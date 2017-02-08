import React, { PropTypes } from 'react';

class NewEventForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      capacity: 0,
      startDate: '',
      participationDeadline: '',
      eventType: 0,
      locationId: null,
      durationHours: 0,
    }
  }

  static propTypes = {
    eventTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    locations: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleCreateEvent: PropTypes.func.isRequired,
  };

  render() {

    const { eventTypes, locations } = this.props

    return (
      <div>
        <form autoComplete="off" onSubmit={(e) => this.props.handleCreateEvent(e, this.state)}>
          <input onChange={(e) => { this.setState({name: e.target.value})}} type='text' placeholder='Name'/>
          <textarea onChange={(e) => { this.setState({description: e.target.value})}} type='text' placeholder='Description'rows='5'/>
          <input onChange={(e) => { this.setState({capacity: e.target.value})}} type='number' placeholder='Capacity'/>
          <select onChange={(e) => { this.setState({capacity: e.target.value})}}>
            { eventTypes.map( (type, i) => <option key={'type'+i} value={i}>{type}</option> )}
          </select>
          <select onChange={(e) => { this.setState({locationId: e.target.value})}}>
            { locations.map( (location, i) => <option key={'type'+i} value={location.id}>{location.name}</option> )}
          </select>
          <input onChange={(e) => { this.setState({startDate: e.target.value})}} type="datetime-local"></input>
          <input onChange={(e) => { this.setState({durationHours: e.target.value})}} type="time"></input>
          <input onChange={(e) => { this.setState({participationDeadline: e.target.value})}} type="datetime-local"></input>
          <button type="submit">Create</button>
        </form>
      </div>
    )
  }
}

export default NewEventForm;