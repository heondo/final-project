import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';

export default class NewUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.newImageURL = null;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.imageToUpload = React.createRef();
    this.state = {
      firstNameInput: '',
      lastNameInput: '',
      emailInput: '',
      locationInput: '',
      bioInput: ''
    };
  }
  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
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
        console.log('Res from upload-user-image:', profilePicURL);
        this.newImageURL = profilePicURL.imageURL;
        this.makeRequestToAddUser();
      })
      .catch(error => console.error(error));
  }
  makeRequestToAddUser() {
    let addUserRequestBody = JSON.parse(JSON.stringify(this.state));
    addUserRequestBody.imageURL = this.newImageURL;
    console.log('addUserRequestBody', addUserRequestBody);
    fetch('/api/add-user/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addUserRequestBody)
    })
      .then(response => response.json())
      .then(newUserData => {
        console.log('Res from add-user:', newUserData);
        // if (newUserData.success) { // TODO: need to redirect to add dog form here
        // }
      })
      .catch(error => console.error(error));
  }
  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <div className="form-container w-50">
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
                      className="form-control"
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
                      className="form-control"
                      value={this.state.lastNameInput}
                      onChange={this.handleInputChange}
                      required />
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <Label htmlFor="emailInput">Email</Label>
                <Input
                  type="email"
                  id="emailInput"
                  name="emailInput"
                  placeholder="Email Address"
                  className="form-control"
                  value={this.state.lastNameInput}
                  onChange={this.handleInputChange}
                  required />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="locationInput">Location</Label>
                <Input
                  type="text"
                  id="locationInput"
                  name="locationInput"
                  placeholder="Location"
                  className="form-control"
                  value={this.state.locationInput}
                  onChange={this.handleInputChange}
                  required />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="bioInput">Description</Label>
                <Input
                  type="textarea"
                  name="bioInput"
                  id="bioInput"
                  placeholder="Description"
                  className="form-control"
                  value={this.state.bioInput}
                  onChange={this.handleInputChange} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="profilePicInput">Upload Profile Picture</Label>
                <CustomInput type="file" name="profilePicInput" id="profilePicInput" innerRef={this.imageToUpload} />
              </FormGroup>

            </Form>
          </div>
        </Row>
      </Container>
    );
  }
}
