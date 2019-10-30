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
      backgroundImage: 'url("./assets/images/pet-logo.svg")',
      minHeight: '50px',
      width: '50px',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    };
    // if conditional is true, like logged in
    // it should render the profile drop down
    let navButtons = (this.props.isLoggedIn) ? (
      <Nav className="ml-auto font-weight-normal" navbar>
        <NavItem onClick={this.toUser}>
          <NavLink>Profile</NavLink>
        </NavItem>
        <NavItem onClick={() => {
          this.props.history.push(`/my-playdates/${this.props.userID}`);
        }}>
          <NavLink >Your Playdates</NavLink>
        </NavItem>
        <NavItem onClick={this.logout}>
          <NavLink >Logout</NavLink>
        </NavItem>
      </Nav>
    ) : (
      <Nav className="ml-auto font-weight-normal" navbar>
        <NavItem onClick={() => {
          this.props.history.push('/login');
        }}>
          <NavLink >Login</NavLink>
        </NavItem>
        <NavItem onClick={() => {
          this.props.history.push('/signup');
        }}>
          <NavLink >Signup</NavLink>
        </NavItem>
      </Nav>
    );

    return (
      <div className="container-fluid">
        <Navbar className="d-flex" color="light" light expand="lg">
          <NavbarBrand>
            <Link to="/" style={bgImage} className="d-inline-block align-middle"></Link>
            <h2 className="d-inline my-auto ml-3">TINDOG</h2>
          </NavbarBrand>
          <SearchDogsBar />
          <Filter />
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {navButtons}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Header);
