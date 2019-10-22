import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import React from 'react';
import { DateRangePicker } from 'react-date-range';

class PickDateRange extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(ranges) {
    const { startDate, endDate } = ranges.selection;
    this.props.handleDates(startDate, endDate);
  }

  render() {
    const { startDate, endDate } = this.props;
    const selectionRange = {
      startDate,
      endDate,
      key: 'selection'
    };
    return (
      <DateRangePicker
        staticRanges={[]}
        inputRanges={[]}
        ranges={[selectionRange]}
        onChange={this.handleSelect}
      />
    );
  }
}

export default PickDateRange;
