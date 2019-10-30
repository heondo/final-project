import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import DOBPicker from '../help/dob-picker';
import AutofillBreed from './autofill-breed';

export default class AddDogForm extends React.Component {
  constructor(props) {
    super(props);
    this.newImageURLs = null;
    this.updateDOB = this.updateDOB.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageSelect = this.handleImageSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.imagesToUpload = React.createRef();
    this.changeBreedState = this.changeBreedState.bind(this);
    this.state = {
      nameInput: '',
      breedIDInput: null,
      breedInput: '',
      weightInput: '',
      dobInput: '',
      genderInput: 'NA',
      fixedInput: '0',
      energyLevelInput: '',
      descriptionInput: '',
      igInput: '',
      imageInput: ''
    };
  }

  changeBreedState(id, name) {
    this.setState({ breedIDInput: id, breedInput: name });
  }

  updateDOB(date) {
    this.setState({ dobInput: date });
  }
  handleInputChange(event) {
    // const { target } = event;
    const name = event.target.name;
    const value = event.target.value;
    // console.log(name, value);
    this.setState({ [name]: value });
  }
  handleImageSelect() {
    const fileList = this.imagesToUpload.current.files;
    let filenames = fileList[0].name;
    if (fileList.length > 1) {
      for (let i = 1; i < fileList.length; i++) {
        filenames += ', ' + fileList[i].name;
      }
    }
    this.setState({ imageInput: filenames });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.makeRequestToUploadDogImage();
  }
  makeRequestToUploadDogImage() {
    let formData = new FormData();
    for (let file of this.imagesToUpload.current.files) {
      formData.append('imageInput', file);
    }
    fetch('/api/upload-dog-image/', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(dogImageURLs => {
        this.newImageURLs = dogImageURLs.imageURLs;
        this.makeRequestToAddDog(this.props.userID);
      })
      .catch(error => console.error(error));
  }
  makeRequestToAddDog(userID) {
    let addDogRequestBody = JSON.parse(JSON.stringify(this.state));
    addDogRequestBody.userID = userID;
    addDogRequestBody.imageURLs = this.newImageURLs;
    if (addDogRequestBody.fixedInput) {
      addDogRequestBody.fixedInput = 1;
    } else {
      addDogRequestBody.fixedInput = 0;
    }
    fetch('/api/add-dog/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addDogRequestBody)
    })
      .then(response => response.json())
      .then(addedDogData => {
        this.props.history.push(`/dog/${addedDogData.insertDogData.insertId}`);
      })
      .catch(error => console.error(error));
  }
  render() {
    let fixedText = 'Fixed';
    if (this.state.genderInput === 'F') {
      fixedText = 'Spayed';
    } else if (this.state.genderInput === 'M') {
      fixedText = 'Neutered';
    }
    let uploadPlaceholderText = 'Choose file(s)';
    if (this.state.imageInput) {
      uploadPlaceholderText = this.state.imageInput;
    }
    return (
      <Container fluid>
        <hr />
        <Row className="justify-content-center">
          <div className="form-container input-forms">
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
                {/* <Input
                  type="text"
                  id="breedInput"
                  name="breedInput"
                  placeholder="Breed"
                  className="form-control"
                  value={this.state.breedInput}
                  onChange={this.handleInputChange}
                  required /> */}
                <AutofillBreed changeBreedState={this.changeBreedState}/>
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

              <FormGroup tag="fieldset" onClick={this.handleInputChange}>
                <p className="mb-1">Gender</p>
                <FormGroup check inline>
                  <Input
                    type="radio"
                    name="genderInput"
                    id="femaleRadioOption"
                    value="F"
                    checked={this.state.genderInput === 'F'}
                  />
                  <Label check htmlFor="femaleRadioOption">Female</Label>
                </FormGroup>
                <FormGroup check inline>
                  <Input
                    type="radio"
                    name="genderInput"
                    id="maleRadioOption"
                    value="M"
                    checked={this.state.genderInput === 'M'}
                  />
                  <Label check htmlFor="maleRadioOption">Male</Label>
                </FormGroup>
                <FormGroup check inline>
                  <Input
                    type="radio"
                    name="genderInput"
                    id="otherRadioOption"
                    value="NA"
                    checked={this.state.genderInput === 'NA'}
                  />
                  <Label check htmlFor="otherRadioOption">Prefer Not to Say</Label>
                </FormGroup>
              </FormGroup>

              <FormGroup tag="fieldset" onChange={this.handleInputChange}>
                <p className="mb-1">{fixedText + '?'}</p>
                <FormGroup check inline>
                  <CustomInput
                    type="radio"
                    name="fixedInput"
                    id="fixedRadioOption"
                    value="1"
                    checked={this.state.fixedInput === '1'} />
                  <Label check htmlFor="fixedRadioOption">Yes</Label>
                </FormGroup>
                <FormGroup check inline>
                  <CustomInput
                    type="radio"
                    name="fixedInput"
                    id="notFixedRadioOption"
                    value="0"
                    checked={this.state.fixedInput === '0'} />
                  <Label check htmlFor="notFixedRadioOption">No</Label>
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
                <Label htmlFor="descriptionInput">Description</Label>
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
                <Label htmlFor="imageInput">Upload Images</Label>
                <CustomInput
                  type="file"
                  name="imageInput"
                  id="imageInput"
                  label={uploadPlaceholderText}
                  multiple
                  innerRef={this.imagesToUpload}
                  onChange={this.handleImageSelect} />
              </FormGroup>

              <FormGroup className="d-flex justify-content-end">
                <Button type="submit" color="primary" outline className="mx-2">Add Dog</Button>
                <Link to={`/user/${this.props.userID}`}>
                  <Button color="secondary" outline>Cancel</Button>
                </Link>
              </FormGroup>
            </Form>
          </div>
        </Row>
      </Container>
    );
  }
}
