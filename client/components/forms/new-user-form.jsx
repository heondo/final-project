import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';

export default class NewUserForm extends React.Component {
  constructor(props) {
    super(props);
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
  handleInputChange() {

  }
  handleSubmit() {

  }
  makeRequestToUploadUserImage() {

  }
  makeRequestToAddUser() {

  }
  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <div className="form-container w-50">
            <h4>New User</h4>
            <Form encType="multipart/form-data" onSubmit={this.handleSubmit}>
              <Row form>
                <Col xs="auto">
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

                <Col xs="auto">
                  <FormGroup>
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
