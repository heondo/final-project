import React from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, FormGroup, Label, CustomInput, Button } from 'reactstrap';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.handleGenderSelect = this.handleGenderSelect.bind(this);
    this.handleEnergyLevelCheckboxes = this.handleEnergyLevelCheckboxes.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openInputDropdown = this.openInputDropdown.bind(this);
    this.closeInputDropdown = this.closeInputDropdown.bind(this);
    this.state = {
      dropdownOpen: false,
      genderFilter: '%',
      weightRangeFilter: {
        min: 0,
        max: 125
      },
      ageRangeFilter: {
        min: 0,
        max: 10
      },
      energyLevelFilter: {
        lowChecked: false,
        mediumChecked: false,
        highChecked: false
      }
    };
  }
  handleGenderSelect(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }
  handleEnergyLevelCheckboxes(event) {
    const energyLevelChecked = event.target.name;
    const checked = event.target.checked;
    this.setState(prevState => {
      return {
        energyLevelFilter: {
          lowChecked: energyLevelChecked === 'lowChecked' ? checked : prevState.energyLevelFilter.lowChecked,
          mediumChecked: energyLevelChecked === 'mediumChecked' ? checked : prevState.energyLevelFilter.mediumChecked,
          highChecked: energyLevelChecked === 'highChecked' ? checked : prevState.energyLevelFilter.highChecked
        }
      };
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.closeInputDropdown();
    const newQueryString = this.buildQueryString();
    this.props.history.push(newQueryString);
  }
  buildQueryString() {
    let newQueryString = '/search?';
    let existingQueryString = '';
    const existingQueryParams = qs.parse(location.search);
    const {
      genderFilter: gender,
      weightRangeFilter: weight,
      ageRangeFilter: age,
      energyLevelFilter: energy
    } = this.state;
    if (Object.keys(existingQueryParams).length) {
      existingQueryString = qs.extract();
    }
    newQueryString += existingQueryString;
    newQueryString += `gender=${gender}&wmin=${weight.min}&wmax=${weight.max}&amin=${age.min}&amax=${age.max}&low=${energy.lowChecked ? 1 : 0}&med=${energy.mediumChecked ? 1 : 0}&high=${energy.highChecked ? 1 : 0}`;
    return newQueryString;
  }
  openInputDropdown() {
    this.setState({ dropdownOpen: true });
  }
  closeInputDropdown() {
    this.setState({ dropdownOpen: false });
  }
  render() {
    return (
      <UncontrolledDropdown isOpen={this.state.dropdownOpen} inNavbar className="mx-2">
        <DropdownToggle caret onClick={this.state.dropdownOpen ? this.closeInputDropdown : this.openInputDropdown}>
          Filter
        </DropdownToggle>
        <DropdownMenu className="px-5 py-4" style={{ width: 'max-content' }}>
          <h3>Filter Dogs</h3>

          <DropdownItem divider />

          <Form onSubmit={this.handleSubmit}>
            <FormGroup tag="fieldset" className="mb-4" onChange={this.handleGenderSelect}>
              <p className="mb-1 ml-n3">Gender</p>
              <FormGroup check inline>
                <CustomInput
                  type="radio"
                  name="genderFilter"
                  id="femaleRadioOption"
                  value="F"
                  checked={this.state.genderFilter === 'F'} />
                <Label check htmlFor="femaleRadioOption">Females</Label>
              </FormGroup>
              <FormGroup check inline>
                <CustomInput
                  type="radio"
                  name="genderFilter"
                  id="maleRadioOption"
                  value="M"
                  checked={this.state.genderFilter === 'M'} />
                <Label check htmlFor="maleRadioOption">Males</Label>
              </FormGroup>
              <FormGroup check inline>
                <CustomInput
                  type="radio"
                  name="genderFilter"
                  id="allRadioOption"
                  value="%"
                  checked={this.state.genderFilter === '%'} />
                <Label check htmlFor="otherRadioOption">All</Label>
              </FormGroup>
            </FormGroup>

            <FormGroup className="mb-5">
              <p className="ml-n3">Weight</p>
              <InputRange
                maxValue={250}
                minValue={0}
                step={5}
                formatLabel={value => `${value} lb`}
                value={this.state.weightRangeFilter}
                onChange={value => this.setState({ weightRangeFilter: value })} />
            </FormGroup>

            <FormGroup className="mb-5">
              <p className="ml-n3">Age</p>
              <InputRange
                maxValue={25}
                minValue={0}
                formatLabel={value => `${value} yrs`}
                value={this.state.ageRangeFilter}
                onChange={value => this.setState({ ageRangeFilter: value })} />
            </FormGroup>

            <FormGroup className="mb-4">
              <Label htmlFor="energyLevelFilter" className="ml-n3">Energy Level</Label>
              <div>
                <CustomInput
                  type="checkbox"
                  name="lowChecked"
                  id="lowChecked"
                  label="Low"
                  checked={this.state.energyLevelFilter.lowChecked}
                  onChange={this.handleEnergyLevelCheckboxes}
                  inline />
                <CustomInput
                  type="checkbox"
                  name="mediumChecked"
                  id="mediumChecked"
                  label="Medium"
                  checked={this.state.energyLevelFilter.mediumChecked}
                  onChange={this.handleEnergyLevelCheckboxes}
                  inline />
                <CustomInput
                  type="checkbox"
                  name="highChecked"
                  id="highChecked"
                  label="High"
                  checked={this.state.energyLevelFilter.highChecked}
                  onChange={this.handleEnergyLevelCheckboxes}
                  inline />
              </div>
            </FormGroup>

            <DropdownItem divider />

            <FormGroup className="float-right">
              <Button type="submit" color="primary" outline className="mx-2">Apply Filters</Button>
              <Button color="secondary" outline onClick={this.closeInputDropdown}>Close</Button>
            </FormGroup>
          </Form>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

export default withRouter(Filter);
