import React from 'react';
import { Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';

export default class NewUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      <div>

      </div>
    );
  }
}
