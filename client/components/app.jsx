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
import Login from './forms/login';
import MakePlaydate from './forms/make-playdate';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      isLoggedIn: true,
      userID: 1
    };
  }

  login(userID) {
    this.setState({ isLoggedIn: true, userID });
  }

  logout() {
    this.setState({ isLoggedIn: false, userID: null });
  }

  // change the view to....nearby-dogs
  // nearby-dogs: {}
  // dog-profile: {id: #}
  // user-profile: {id: #}
  render() {
    const { isLoggedIn, userID } = this.state;
    return (
      <>
        <Router >
          <Header isLoggedIn={isLoggedIn} login={this.login} logout={this.logout} userID={userID}/>
          <MakePlaydate />

          <Switch>
            <Route path="/dog/:id" render={props => <DogProfile {...props} userID={userID}/> }>
            </Route>
            <Route path="/add-dog" render={props => <AddDogForm {...props} userID={userID} />}>
            </Route>
            <Route path="/user/:id" render={props => <UserProfile {...props} userID={userID}/>}>
            </Route>
            <Route path="/login" render={props => <Login {...props} login={this.login}/>}>
            </Route>
            <Route path="/signup" render={props => <NewUserForm {...props} />}>
            </Route>
            <Route key="search-dogs" path="/search" render={props => <DogList {...props} />}/>
            <Route key="filter-dogs" path="/filter" render={props => <DogList {...props} />} />
            <Route key="home-page" exact path="/" render={props => <DogList {...props} />} />
            <Route component={Error404Page} />
          </Switch>
        </Router>
      </>
    );
  }
}
