import React from 'react';
import Script from 'react-load-script';
import { Input, Label, Button, FormFeedback } from 'reactstrap';
import PickDateRange from './../forms/pick-date-range';

export default class MakePlaydate extends React.Component {
  constructor(props) {
    super(props);
    this.handleDates = this.handleDates.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
    this.state = {
      selectedDays: [new Date()],
      query: '',
      coordinates: {},
      validLocation: null
    };
  }

  handleDates(selectedDays) {
    this.setState({ selectedDays });
  }

  handleLocationChange(query) {
    this.setState({ query, coordinates: {}, validLocation: null });
  }

  handleLocationSelect(query, coordinates) {
    this.setState({ query, coordinates, validLocation: null });
  }

  handleSubmit() {
    if (!this.state.coordinates.lat) {
      this.setState({ validLocation: false });
      // console.log('must select valid address');
    } else if (!this.state.selectedDays) {
      console.log('must select a date');
    } else {
      const reqBody = Object.assign({}, this.state);
      reqBody.dog_id = this.props.dogID;
      fetch('/api/add-playdates/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody)
      }).then(res => res.json())
        .then(res => res);
    }
  }

  render() {
    return (
      <>
        <h4 className="mb-1">Make Listings</h4>
        <PlaydateLocation className="mb-1" handleLocationChange={this.handleLocationChange} handleLocationSelect={this.handleLocationSelect} query={this.state.query} validLocation={this.state.validLocation}/>
        <PickDateRange handleDates={this.handleDates} selectedDays={this.state.selectedDays}/>
        <Button className="d-block" onClick={this.handleSubmit}>
          Create Playdates
        </Button>
      </>

    );
  }
}

class PlaydateLocation extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.locationAutoComplete = null;
  }
  handleChange(event) {
    const query = event.target.value;
    this.props.handleLocationChange(query);
  }
  handleScriptLoad() {
    // const options = {
    //   types: ['(cities)']
    // };
    this.locationAutoComplete = new google.maps.places.Autocomplete(
      document.getElementById('playdateListing')
      // options
    );
    this.locationAutoComplete.setFields(['address_components', 'formatted_address', 'geometry']);
    this.locationAutoComplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handlePlaceSelect() {
    const addressObject = this.locationAutoComplete.getPlace();
    const address = addressObject.address_components;
    const coordinates = {
      lat: addressObject.geometry.location.lat(),
      lng: addressObject.geometry.location.lng()
    };
    if (address) {
      this.props.handleLocationSelect(addressObject.formatted_address, coordinates);
    }
  }

  render() {
    return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCWq6apxh7IJs8njuJgCEJf5QPenKjrCYc&libraries=places"
          onLoad={this.handleScriptLoad} />
        <Label>Location for Playdate</Label>
        {(this.props.validLocation === false)
          ? <Input
            type="text"
            id="playdateListing"
            name="playdateListing"
            placeholder="Location"
            onChange={this.handleChange}
            value={this.props.query}
            invalid
            required />
          : <Input
            type="text"
            id="playdateListing"
            name="playdateListing"
            placeholder="Location"
            onChange={this.handleChange}
            value={this.props.query}
            required />}
        <FormFeedback>Valid location is required</FormFeedback>

      </div>
    );
  }
}
