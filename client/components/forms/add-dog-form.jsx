import React from 'react';
import { Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import DOBPicker from '../help/dobPicker';

export default class AddDogForm extends React.Component {
  constructor(props) {
    super(props);
    this.newImageURL = null;
    this.updateDOB = this.updateDOB.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.imageToUpload = React.createRef();
    this.state = {
      nameInput: '',
      breedInput: '',
      weightInput: '',
      dobInput: '',
      genderInput: '',
      energyLevelInput: '',
      descriptionInput: '',
      igInput: ''
    };
  }
  updateDOB(date) {
    this.setState({ dobInput: date });
  }
  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    console.log(this.imageToUpload.current.files[0]);

    this.makeRequestToUploadDogImage();
  }
  makeRequestToUploadDogImage() {
    let formData = new FormData();
    formData.append('imageInput', this.imageToUpload.current.files[0]);
    fetch('/api/upload-dog-image', {
      method: 'POST',
      // headers: { 'Content-Type': 'multipart/form-data' },
      body: formData
    })
      .then(response => response.json())
      .then(dogImageURL => {
        this.newImageURL = dogImageURL.imageURL;
        this.makeRequestToAddDog(this.props.userID);
      })
      .catch(error => console.error(error));
  }
  makeRequestToAddDog(userID) {
    let addDogRequestBody = JSON.parse(JSON.stringify(this.state));
    addDogRequestBody.userID = userID;
    addDogRequestBody.imageURL = this.newImageURL;
    console.log(addDogRequestBody);
    fetch('/api/add-dog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addDogRequestBody)
    })
      .then(response => response.json())
      .then(addedDogData => {
        if (addedDogData.success) {
          // need to redirect to newly created dog page here
        }
      })
      .catch(error => console.error(error));
  }
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="form-container w-50">
            <h4>Add New Dog</h4>
            <Form encType="multipart/form-data" onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label htmlFor="nameInput">Name</Label>
                <Input
                  type="text"
                  id="nameInput"
                  name="nameInput"
                  placeholder="Name"
                  className="form-control"
                  value={this.state.nameInput}
                  onChange={this.handleInputChange}
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
                  value={this.state.breedInput}
                  onChange={this.handleInputChange}
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
                  value={this.state.weightInput}
                  onChange={this.handleInputChange}
                  required />
              </FormGroup>

              <FormGroup>
                <p>Date of Birth</p>
                <DOBPicker updateDOBCallback={this.updateDOB} />
              </FormGroup>

              <FormGroup tag="fieldset" onChange={this.handleInputChange}>
                <p className="mb-1">Gender</p>
                <FormGroup check inline>
                  <CustomInput type="radio" name="genderInput" id="femaleRadioOption" value="F" />
                  <Label check htmlFor="femaleRadioOption">Female</Label>
                </FormGroup>
                <FormGroup check inline>
                  <CustomInput type="radio" name="genderInput" id="maleRadioOption" value="M" />
                  <Label check htmlFor="maleRadioOption">Male</Label>
                </FormGroup>
                <FormGroup check inline>
                  <CustomInput type="radio" name="genderInput" id="otherRadioOption" value="NULL" />
                  <Label check htmlFor="otherRadioOption">Prefer Not to Say</Label>
                </FormGroup>
              </FormGroup>

              <FormGroup tag="fieldset" onChange={this.handleInputChange}>
                <p className="mb-1">Energy Level</p>
                <FormGroup check inline>
                  <CustomInput type="radio" name="energyLevelInput" id="lowRadioOption" value="0" />
                  <Label check htmlFor="lowRadioOption">Low</Label>
                </FormGroup>
                <FormGroup check inline>
                  <CustomInput type="radio" name="energyLevelInput" id="mediumRadioOption" value="1" />
                  <Label check htmlFor="mediumRadioOption">Medium</Label>
                </FormGroup>
                <FormGroup check inline>
                  <CustomInput type="radio" name="energyLevelInput" id="highRadioOption" value="2" />
                  <Label check htmlFor="highRadioOption">High</Label>
                </FormGroup>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="description">Description</Label>
                <Input
                  type="textarea"
                  name="descriptionInput"
                  id="descriptionInput"
                  placeholder="Description"
                  className="form-control"
                  value={this.state.descriptionInput}
                  onChange={this.handleInputChange} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="igInput">Instagram</Label>
                <Input
                  type="url"
                  id="igInput"
                  name="igInput"
                  placeholder="Instagram Link"
                  className="form-control"
                  value={this.state.igInput}
                  onChange={this.handleInputChange} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="imageInput">Upload Image</Label>
                <CustomInput type="file" name="imageInput" id="imageInput" innerRef={this.imageToUpload} />
              </FormGroup>

              <FormGroup className="d-flex justify-content-end">
                <Button type="submit" color="primary" outline className="mx-2">Add Dog</Button>
                <Button color="secondary" outline>Cancel</Button>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
