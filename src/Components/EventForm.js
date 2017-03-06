import React, { PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import axios from 'axios';

class EventForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      event_name: '',
      description: '',
      capacity: 0,
      event_date: '',
      participation_deadline: '',
      durationHours: 0,
      event_type: 'talk',
      hosts: [],
      hosts_suggestions: []
    }
  }

  static propTypes = {
    eventTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    locations: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleCreateEvent: PropTypes.func.isRequired,
  };

  handleSearchProfile = query => {

    if (query) {
      axios.get('/api/profile/?search=' + query)
      .then( result => {
        this.setState({
          host_suggestions: result.data.results
        })
      })
    }

  }

  render() {

    const { eventTypes, locations } = this.props;
    const { host_suggestions } = this.state

    if (!locations) return null

    const dataSourceConfig = {
      text: 'textKey',
      value: 'valueKey',
    };

    const dataSource = host_suggestions ? host_suggestions.map ( suggestion => {
      return { textKey: suggestion.name, valueKey: suggestion.userId }
    }) : []

    const {
      event_name,
      description,
      capacity,
      event_type,
      event_date,
      participation_deadline,
      durationHours
    } = this.state

    return (
      <div>
        <form className="event-form" onSubmit={(e) => this.props.handleCreateEvent(e, this.state)}>
          <input
            onChange={(e) => { this.setState({event_name: e.target.value})}}
            type='text'
            defaultValue={event_name}
            name="name"
            placeholder='Name'
          />
          <textarea
            onChange={(e) => { this.setState({description: e.target.value})}}
            type='text'
            name="description"
            placeholder='Description'
            defaultValue={description}
            rows='5'
          />
          <input
            onChange={(e) => { this.setState({capacity: e.target.value})}}
            type='number'
            name="capacity"
            placeholder='Capacity'
            defaultValue={capacity}
          />
          <select
            defaultValue={event_type}
            name="type"
            onChange={(e) => { this.setState({event_type: e.target.value.toLowerCase()})}}
          >
            { eventTypes.map( (type, i) => <option key={'type'+i} value={type}>{type}</option> )}
          </select>
          <select
            defaultValue={locations[0].id}
            name="location"
            onChange={(e) => { this.setState({event_location: e.target.value})}}
          >
            { locations.map( (location, i) => <option key={location._id} value={location._id}>{location.name}</option> )}
          </select>
          <input
            defaultValue={event_date}
            onChange={(e) => { this.setState({event_date: e.target.value})}}
            type="date"
            name="date"
          />
          <input
            defaultValue={durationHours}
            onChange={(e) => { this.setState({durationHours: e.target.value})}}
            type="time"
            name="duration"
          />
          <input
            defaultValue={participation_deadline}
            onChange={(e) => { this.setState({participation_deadline: e.target.value})}}
            type="date"
            name="deadline"
          />
          <button
            type="submit"
            className="submit"
          >Create
          </button>
          <AutoComplete
            hintText="Type anything"
            filter={AutoComplete.noFilter}
            dataSource={dataSource}
            onUpdateInput={this.handleSearchProfile.bind(this)}
            dataSourceConfig={dataSourceConfig}
          />
        </form>
      </div>
    )
  }
}

export default EventForm;