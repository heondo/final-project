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
import { Link, withRouter } from 'react-router-dom';
import SearchDogsBar from './../map/search-dogs-bar';
import Filter from './filter';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.logout = this.logout.bind(this);
    this.toUser = this.toUser.bind(this);
    this.state = {
      isOpen: false
    };
  }

  logout() {
    this.props.logout();
    this.props.history.push('/');
  }

  toUser() {
    this.props.history.push('/user/' + this.props.userID);
  }

  toggleNav() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const bgImage = {
      backgroundImage: 'url("./assets/pet-logo.svg")',
      minHeight: '50px',
      width: '50px',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    };
    const { isOpen } = this.state;
    // if conditional is true, like logged in
    // it should render the profile drop down
    let navButtons = (this.props.isLoggedIn) ? (
      <Nav className="ml-auto font-weight-normal" navbar>
        <NavItem>
          <NavLink >Make Playdate</NavLink>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Profile
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={this.toUser}>
              Your Account
            </DropdownItem>
            <DropdownItem>
              Notifications
            </DropdownItem>
            <DropdownItem>
              Your dogs
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={this.logout}>
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
        <Navbar className="d-flex" color="light" light expand="md">
          <NavbarBrand>
            <Link to="/" style={bgImage} className="d-inline-block align-middle"></Link>
            <h2 className="d-inline my-auto ml-3">TINDOG</h2>
          </NavbarBrand>
          <SearchDogsBar />
          <Filter />
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={isOpen} navbar className="d-inline-block">
            {navButtons}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Header);
