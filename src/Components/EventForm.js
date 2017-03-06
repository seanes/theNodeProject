import React, { PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import axios from 'axios';
import Chip from 'material-ui/Chip';


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
      hosts: [],
      hosts_suggestions: [],
      chipData: [],
      event_type: 'talk',
      event_location: null
    }
  }

  serializeEvent = () => {

    const { event_name, description, capacity, event_date, participation_deadline, durationHours, chipData, event_location, event_type } = this.state

    return {
      event_name,
      description,
      capacity,
      event_date,
      participation_deadline,
      durationHours,
      event_type,
      event_location: event_location || this.props.locations[0].id,
      hosts: chipData.map( chip => chip.valueKey )
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
          hosts_suggestions: result.data.results
        })
      })
    }
  }

  handleAddUser(chip, index) {

    if (index < 0) return

    const { chipData } = this.state

    this.refs.autocomplete.setState({ searchText: ''})

    this.setState({
      chipData: chipData.concat(chip)
    })
  }

  handleRemoveChip(key) {
    const { chipData } = this.state
    const updatedList = chipData.filter( chip => chip.valueKey !== key)
    this.setState({
      chipData: updatedList
    })
  }


  render() {

    const { eventTypes, locations } = this.props;

    if (!locations) return null

    const dataSourceConfig = {
      text: 'textKey',
      value: 'valueKey',
    };

    const {
      event_name,
      description,
      capacity,
      event_type,
      event_date,
      participation_deadline,
      event_location,
      durationHours,
      hosts_suggestions,
      chipData
    } = this.state


    const dataSource = hosts_suggestions ? hosts_suggestions.map ( suggestion => {
        return { textKey: suggestion.name, valueKey: suggestion._id }
      }) : []

    return (
      <div>
        <form className="event-form" onSubmit={(e) => this.props.handleCreateEvent(e, this.serializeEvent())}>
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
            defaultValue={event_location}
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
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            <div>Hosts: </div>
            {chipData.map( chip => (
              <Chip
                key={chip.valueKey}
                style={{margin: 5}}
                onRequestDelete={() => this.handleRemoveChip(chip.valueKey)}
              >
                { chip.textKey }
             </Chip>
            ))}
          </div>
          <AutoComplete
            ref="autocomplete"
            hintText="Add host"
            filter={ (searchText, key) => chipData.map( chip => chip.textKey).indexOf(key) < 0}
            dataSource={dataSource}
            onUpdateInput={this.handleSearchProfile.bind(this)}
            maxSearchResults={7}
            dataSourceConfig={dataSourceConfig}
            onNewRequest={this.handleAddUser.bind(this)}
          />
          <button
            type="submit"
            className="submit"
          >Create
          </button>
        </form>
      </div>
    )
  }
}

export default EventForm;