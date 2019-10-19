import React from 'react';
// import { withRouter } from 'react-router-dom';
import Script from 'react-load-script';
import { Input } from 'reactstrap';

export default class UserLocationInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.locationAutoComplete = null;
    this.state = {
      address: '',
      query: '',
      coordinates: {}
    };
  }
  handleChange(event) {
    const query = event.target.value;
    this.setState({ query });
  }
  handleScriptLoad() {
    // const options = {
    //   types: ['(cities)']
    // };
    this.locationAutoComplete = new google.maps.places.Autocomplete(
      document.getElementById('locationInput')
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
      this.setState(
        {
          address,
          query: addressObject.formatted_address,
          coordinates
        }
      );
      this.props.updateLocationCallback(this.state.coordinates.lat, this.state.coordinates.lng, this.state.query);
    }
  }
  // componentDidMount() {
  //   this.handleScriptLoad();
  // }
  render() {
    return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCWq6apxh7IJs8njuJgCEJf5QPenKjrCYc&libraries=places"
          onLoad={this.handleScriptLoad} />
        <Input
          type="text"
          id="locationInput"
          name="locationInput"
          placeholder="Location"
          onChange={this.handleChange}
          value={this.state.query}
          required />
      </div>
    );
  }
}
