import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: '',
      password: '',
      emailValid: true,
      passWordValid: true
    };
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value, emailValid: true, passWordValid: true });
  }

  handleSubmit(event) {
    event.preventDefault();
    // make a fetch request to the login post endpoint, compare the password with bcrypt hash
    // and if it returns true then set the userID to the matched one or just send back a response of false/failed
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    }).then(res => res.json())
      .then(res => {
        if (res.error) {
          throw new Error(res.error);
        } else if (res.message === 'No email found') {
          this.setState({ emailValid: false });
        } else if (res.message === 'Password did not match') {
          this.setState({ passWordValid: false });
        } else {
          const { user, dogs } = res;
          this.props.login(user, dogs);
          this.props.history.push(`/user/${user}/`);
        }
      }).catch(err => console.error(err));
  }

  render() {

    return (
      <Container>
        <hr />
        <Row className="justify-content-center">
          <div className="form-container w-50">
            <h4>Login</h4>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label htmlFor="emailInput">Email</Label>
                {(!this.state.emailValid) ? (
                  <Input
                    type="email"
                    id="emailLogin"
                    name="email"
                    placeholder="Email Address"
                    value={this.state.email}
                    invalid
                    onChange={this.handleInputChange}
                    required />)
                  : (<Input
                    type="email"
                    id="emailLogin"
                    name="email"
                    placeholder="Email Address"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    required />)}
                <FormFeedback>That email is not in our database!</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="passWordInput">Password</Label>
                {(!this.state.passWordValid) ? (
                  <Input
                    type="passWord"
                    id="passwordLogin"
                    name="password"
                    placeholder="Password"
                    invalid
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    required />)
                  : (<Input
                    type="passWord"
                    id="passwordLogin"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    required />)}
                <FormFeedback>Incorrect Password</FormFeedback>
              </FormGroup>
              <FormGroup className="d-flex justify-content-end">
                <Button type="submit" color="primary" outline className="mx-2">Log In</Button>
                <Button color="secondary" outline className="mx-2">Cancel</Button>
              </FormGroup>
            </Form>
          </div>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Login);
