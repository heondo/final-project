import React from 'react';
import { withRouter } from 'react-router-dom';
import Script from 'react-load-script';
import { Input } from 'reactstrap';

class UserLocationInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.autoComplete = null;
    this.state = {
      address: '',
      query: '',
      coordinates: {}
    };
  }

  handleChange(event) {
    const query = event.target.value;
    this.setState({
      query
    });
  }

  handleScriptLoad() {
    // const options = {
    //   types: ['(cities)']
    // };

    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete')
      // options
    );

    this.autocomplete.setFields(['address_components', 'formatted_address', 'geometry']);
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handlePlaceSelect() {
    const addressObject = this.autocomplete.getPlace();
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
    }
  }

  render() {
    return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCWq6apxh7IJs8njuJgCEJf5QPenKjrCYc&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <Input
          type="text"
          id="locationInput"
          name="locationInput"
          placeholder="Location"
          className="form-control"
          onChange={this.handleChange}
          value={this.state.query} />
      </div>
    );
  }
}

export default withRouter(SearchDogsBar);
