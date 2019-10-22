import React from 'react';
import PickDateRange from './../forms/pick-date-range';

export default class MakePlaydate extends React.Component {
  constructor(props) {
    super(props);
    this.handleDates = this.handleDates.bind(this);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      location: {}
    };
  }

  handleDates(startDate, endDate) {
    this.setState({ startDate, endDate });
  }

  render() {
    return (
      <>
      <h4>Make Listings</h4>
        <PickDateRange handleDates={this.handleDates} startDate={this.state.startDate} endDate={this.state.endDate}/>
      </>

    );
  }
}
