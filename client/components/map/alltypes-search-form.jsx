import React from 'react';
import Script from 'react-load-script';

export default class AutocompleteSearch extends React.Component {
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
    // Declare Options For Autocomplete
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
      <div style={{ minWidth: '50vw' }}>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCWq6apxh7IJs8njuJgCEJf5QPenKjrCYc&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <input onChange={this.handleChange} id="autocomplete" placeholder="Search Bar Here" value={this.state.query} className="form-control"
          style={{
            margin: '0 auto'
          }}
        />
      </div>
    );
  }
}
