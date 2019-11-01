import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import AddDogForm from './forms/add-dog-form';
import Header from './help/header';
import DogList from './dog/dog-list';
import DogProfile from './dog/dog-profile';
import UserProfile from './user/user-profile';
import Error404Page from './help/error-404-page';
import NewUserForm from './forms/new-user-form';
import UserPlayReqs from './user/user-play-reqs';
import Login from './forms/login';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      isLoggedIn: true,
      userID: null,
      userDogs: []
    };
  }

  login(userID, dogs) {
    this.setState({ isLoggedIn: true, userID, userDogs: dogs });
  }

  logout() {
    this.setState({ isLoggedIn: false, userID: null, userDogs: null });
  }

  render() {
    const { isLoggedIn, userID, userDogs } = this.state;
    return (
      <>
        <Router >
          <Header isLoggedIn={isLoggedIn} login={this.login} logout={this.logout} userID={userID}/>
          <Switch>
            <Route path="/dog/:id" render={props => <DogProfile {...props} userID={userID} userDogs={userDogs} />}>
            </Route>
            <Route path="/add-dog" render={props => <AddDogForm {...props} userID={userID} />}>
            </Route>
            <Route path="/my-playdates/:id" render={props => <UserPlayReqs {...props} userID={userID} />}>
            </Route>
            <Route path="/user/:id" render={props => <UserProfile {...props} userID={userID} />}>
            </Route>
            <Route path="/login" render={props => <Login {...props} login={this.login} />}>
            </Route>
            <Route path="/signup" render={props => <NewUserForm {...props} login={this.login} />}>
            </Route>
            <Route key="search-dogs" path="/search" render={props => <DogList {...props} userID={userID} />} />
            <Route key="home-page" exact path="/" render={props => <DogList {...props} userID={userID} />} />
            <Route component={Error404Page} />
          </Switch>
        </Router>
      </>
    );
  }
}
