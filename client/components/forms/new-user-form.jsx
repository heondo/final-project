import React from 'react';
import { Link } from 'react-router-dom';
import UserLocationInput from '../map/user-location-input';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, CustomInput, FormFeedback } from 'reactstrap';

export default class NewUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.newImageURL = null;
    this.updateLocation = this.updateLocation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageSelect = this.handleImageSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.imageToUpload = React.createRef();
    this.state = {
      firstNameInput: '',
      lastNameInput: '',
      emailInput: '',
      passWordInput: '',
      locationInput: {
        lat: '',
        lng: '',
        city: ''
      },
      bioInput: '',
      imageInput: '',
      validEmailInput: true
    };
  }

  updateLocation(lat, lng, city) {
    this.setState({ locationInput: { lat, lng, city } });
  }
  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'emailInput') {
      this.setState({ validEmailInput: true });
    }
    this.setState({ [name]: value });
  }
  handleImageSelect() {
    this.setState({ imageInput: this.imageToUpload.current.files[0].name });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.makeRequestToUploadUserImage();
  }
  makeRequestToUploadUserImage() {
    let formData = new FormData();
    formData.append('profilePicInput', this.imageToUpload.current.files[0]);
    fetch('/api/upload-user-image/', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(profilePicURL => {
        this.newImageURL = profilePicURL.imageURL;
        this.makeRequestToAddUser();
      })
      .catch(error => console.error(error));
  }
  makeRequestToAddUser() {
    let addUserRequestBody = JSON.parse(JSON.stringify(this.state));
    addUserRequestBody.imageURL = this.newImageURL;
    fetch('/api/add-user/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addUserRequestBody)
    })
      .then(response => response.json())
      .then(newUserData => {
        if (newUserData.error) {
          // catch error
          if (newUserData.error === 'email') {
            this.setState({ validEmailInput: false });
            throw new Error(newUserData.error);
          }
        }
        this.props.login(newUserData.data.insertId, []);
        this.props.history.push(`/user/${newUserData.data.insertId}`);
      })
      .catch(error => console.error(error));
  }
  render() {
    let uploadPlaceholderText = 'Choose File';
    if (this.state.imageInput) {
      uploadPlaceholderText = this.state.imageInput;
    }
    return (
      <Container>
        <hr />
        <Row className="justify-content-center">
          <div className="form-container input-forms">
            <h4>New User</h4>
            <Form encType="multipart/form-data" onSubmit={this.handleSubmit}>
              <Row form>
                <Col xs="6">
                  <FormGroup>
                    <Label htmlFor="firstNameInput">Name</Label>
                    <Input
                      type="text"
                      id="firstNameInput"
                      name="firstNameInput"
                      placeholder="First Name"
                      value={this.state.firstNameInput}
                      onChange={this.handleInputChange}
                      required />
                  </FormGroup>
                </Col>

                <Col xs="6">
                  <FormGroup>
                    <Label htmlFor="lastNameInput"><br /></Label>
                    <Input
                      type="text"
                      id="lastNameInput"
                      name="lastNameInput"
                      placeholder="Last Name"
                      value={this.state.lastNameInput}
                      onChange={this.handleInputChange}
                      required />
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <Label htmlFor="emailInput">Email</Label>
                {(this.state.validEmailInput) ? <Input
                  type="email"
                  id="emailInput"
                  name="emailInput"
                  placeholder="Email Address"
                  value={this.state.emailInput}
                  onChange={this.handleInputChange}
                  required />
                  : <Input
                    type="email"
                    id="emailInput"
                    name="emailInput"
                    placeholder="Email Address"
                    value={this.state.emailInput}
                    onChange={this.handleInputChange}
                    invalid
                    required />}
                <FormFeedback>This email address is already taken</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="passWordInput">Password</Label>
                <Input
                  type="passWord"
                  id="passWordInput"
                  name="passWordInput"
                  placeholder="Password"
                  value={this.state.passWordInput}
                  onChange={this.handleInputChange}
                  required />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="locationInput">Location</Label>
                {/* <Input
                  type="text"
                  id="locationInput"
                  name="locationInput"
                  placeholder="Location"
                  value={this.state.locationInput}
                  onChange={this.handleInputChange}
                  required /> */}
                <UserLocationInput updateLocationCallback={this.updateLocation} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="bioInput">Description</Label>
                <Input
                  type="textarea"
                  name="bioInput"
                  id="bioInput"
                  placeholder="Description"
                  value={this.state.bioInput}
                  onChange={this.handleInputChange} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="profilePicInput">Upload Profile Picture</Label>
                <CustomInput
                  type="file"
                  name="profilePicInput"
                  id="profilePicInput"
                  label={uploadPlaceholderText}
                  innerRef={this.imageToUpload}
                  onChange={this.handleImageSelect} />
              </FormGroup>

              <FormGroup className="d-flex justify-content-end">
                <Button type="submit" color="primary" outline className="mx-2">Sign Up</Button>
                <Link to={`/`}>
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
