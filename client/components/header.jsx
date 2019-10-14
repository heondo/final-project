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
    return (
      <div className="container-fluid">
        <Navbar color="light" light expand="md">
          <NavbarBrand>
            <div style={bgImage} className="d-inline-block align-middle mb-1"></div>
            <h2 className="d-inline my-auto ml-n3">TinDog</h2>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto font-weight-normal" navbar>
              <NavItem>
                <NavLink href="#">Make Playdate</NavLink>
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
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
