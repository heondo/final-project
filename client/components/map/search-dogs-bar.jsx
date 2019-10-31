import React from 'react';
import qs from 'query-string';
import { withRouter } from 'react-router-dom';
import Script from 'react-load-script';
import { Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';

class SearchDogsBar extends React.Component {
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
    const newQueryString = this.buildQueryString();
    this.props.history.push(newQueryString);
  }

  buildQueryString() {
    let newQueryString = '/search?';
    const queryParams = qs.parse(location.search);
    const { coordinates } = this.state;

    queryParams.lat = coordinates.lat;
    queryParams.lng = coordinates.lng;

    newQueryString += qs.stringify(queryParams);
    return newQueryString;
  }

  render() {
    return (
      <div style={{ maxWidth: '65%', minWidth: '50%' }} className="search-navbar">
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCWq6apxh7IJs8njuJgCEJf5QPenKjrCYc&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <InputGroup>
          <Input
            onChange={this.handleChange}
            id="autocomplete"
            placeholder="Search Dogs by Location"
            value={this.state.query}
            className="form-control"
            style={{ margin: '0 auto' }}
          />
          <InputGroupAddon addonType="append">
            <button className="btn oc-bg-grey oc-btn-grey active" aria-pressed="true">Go</button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}

export default withRouter(SearchDogsBar);
