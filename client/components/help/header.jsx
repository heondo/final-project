import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
// import HeaderModal from './header-modal';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggleNav() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const bgImage = {
      backgroundImage: 'url("./assets/pet-logo.svg")',
      minHeight: '50px',
      width: '100%',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    };
    const { isOpen } = this.state;
    // if conditional is true, like logged in
    // it should render the profile drop down
    let navButtons = (false) ? (
      <Nav className="ml-auto font-weight-normal" navbar>
        <NavItem>
          <NavLink >Make Playdate</NavLink>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Profile
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              Your Account
            </DropdownItem>
            <DropdownItem>
              Notifications
            </DropdownItem>
            <DropdownItem>
              Your dogs
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    ) : (
      <Nav className="ml-auto font-weight-normal" navbar>
        <NavItem>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/signup">Signup</NavLink>
        </NavItem>
      </Nav>
    );

    return (
      <div className="container-fluid">
        <Navbar color="light" light expand="md">
          <NavbarBrand>
            <Link to="/"><div style={bgImage} className="d-inline-block align-middle" /></Link>
            <h2 className="d-inline my-auto ml-n3">TinDog</h2>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={isOpen} navbar>
            {navButtons}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}