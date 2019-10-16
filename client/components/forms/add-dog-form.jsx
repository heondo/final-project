import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import DOBPicker from '../help/dobPicker';

export default class AddDogForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: '',
      breedValue: '',
      weightValue: '',
      genderValue: '',
      dobValue: '',
      energyLevelValue: '',
      descriptionValue: ''
    };
  }
  // handleTextInputChange() {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   this.setState({ [name]: value });
  // }
  // handleSelectInputChange() {

  // }
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="form-container w-50">
            <h5>Add New dog</h5>
            <Form>
              <FormGroup>
                <Label for="nameInput">Name</Label>
                <Input
                  type="text"
                  id="nameInput"
                  name="nameInput"
                  placeholder="Name"
                  className="form-control"
                  value={this.state.nameValue}
                  // onChange={}
                  required />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="breedInput">Breed</Label>
                <Input
                  type="text"
                  id="breedInput"
                  name="breedInput"
                  placeholder="Breed"
                  className="form-control"
                  value={this.state.breedValue}
                  // onChange={}
                  required />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="weightInput">Weight</Label>
                <Input
                  type="number"
                  id="weightInput"
                  name="weightInput"
                  placeholder="Weight (lbs)"
                  className="form-control"
                  value={this.state.weightValue}
                  // onChange={}
                  required />
              </FormGroup>

              <FormGroup tag="fieldset">
                <p>Gender</p>
                <FormGroup className="form-check form-check-inline">
                  <Input
                    className="form-check-input"
                    type="radio"
                    name="genderRadioOptions"
                    id="femaleRadioOption"
                    value="female" />
                  <Label className="form-check-label" htmlFor="femaleRadioOption">Female</Label>
                </FormGroup>
                <FormGroup className="form-check form-check-inline">
                  <Input
                    className="form-check-input"
                    type="radio"
                    name="genderRadioOptions"
                    id="maleRadioOption"
                    value="male" />
                  <Label className="form-check-label" htmlFor="maleRadioOption">Male</Label>
                </FormGroup>
                <FormGroup className="form-check form-check-inline">
                  <Input
                    className="form-check-input"
                    type="radio"
                    name="genderRadioOptions"
                    id="otherRadioOption"
                    value="other" />
                  <Label className="form-check-label" htmlFor="otherRadioOption">Prefer Not to Say</Label>
                </FormGroup>
              </FormGroup>

              <FormGroup>
                <p>Date of Birth</p>
                <DOBPicker />
              </FormGroup>

              <FormGroup className="d-flex justify-content-end">
                <Button type="submit" color="primary" className="mx-2">Add Dog</Button>
                <Button color="secondary">Cancel</Button>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
