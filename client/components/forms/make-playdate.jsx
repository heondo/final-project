import React from 'react';
import Script from 'react-load-script';
import { Input, Label, Button } from 'reactstrap';
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
      coordinates: {}
    };
  }

  handleDates(selectedDays) {
    this.setState({ selectedDays });
  }

  handleLocationChange(query) {
    this.setState({ query, coordinates: {} });
  }

  handleLocationSelect(query, coordinates) {
    this.setState({ query, coordinates });
  }

  handleSubmit() {
    if (!this.state.coordinates.lat) {
      console.log('must select valid address');

    } else {
      // make a fetch request to the backend to create dog listings?
      const reqBody = Object.assign({}, this.state);
      reqBody.dog_id = this.props.dogID;
      fetch('/api/add-playdates/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody)
      });
    }
  }

  render() {
    return (
      <>
        <h4 className="mb-1">Make Listings</h4>
        <PlaydateLocation className="mb-1" handleLocationChange={this.handleLocationChange} handleLocationSelect={this.handleLocationSelect} query={this.state.query}/>
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
        <Input
          type="text"
          id="playdateListing"
          name="playdateListing"
          placeholder="Location"
          onChange={this.handleChange}
          value={this.props.query}
          required />
      </div>
    );
  }
}
