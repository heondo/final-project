import React from 'react';
import {
  Router,
  Switch,
  Route

} from 'react-router-dom';
import AddDogForm from './forms/add-dog-form';
import Header from './help/header';
import DogList from './dog/dog-list';
import DogProfile from './dog/dog-profile';
import UserProfile from './user/user-profile';
import NewUserForm from './forms/new-user-form';

import { createBrowserHistory } from 'history';

export default class App extends React.Component {
  // change the view to....nearby-dogs
  // nearby-dogs: {}
  // dog-profile: {id: #}
  // user-profile: {id: #}
  render() {
    return (
      <>
        <Router history={createBrowserHistory()}>
          <Header />
          <hr />
          <Switch>
            <Route path="/dog/:id" render={props => <DogProfile {...props}/>}>
            </Route>
            <Route path="/add-dog" render={props => <AddDogForm {...props} userID="1" />}>
            </Route>
            <Route path="/user/:id" render={props => <UserProfile {...props}/>}>
            </Route>
            <Route path="/login">
              <div>You are viewing the log in page</div>
            </Route>
            <Route path="/signup">
              <div>You are viewing the sign up page</div>
            </Route>
            <Route key="search-dogs" path="/search" render={props => <DogList {...props} />}/>
            <Route key="home-page" exact path="/" render={props => <DogList {...props} />} />
          </Switch>
        </Router>
      </>
    );
  }
}
