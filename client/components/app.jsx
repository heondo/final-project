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
import AutofillBreed from './forms/autofill-breed';

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
          <AutofillBreed/>
          <hr />
          <Switch>
            <Route path="/dog/:id">
              <DogProfile />
            </Route>
            <Route path="/add-dog">
              <AddDogForm userID="1"/>
            </Route>
            <Route path="/user/:id">
              <UserProfile />
            </Route>
            <Route path="/login">
              <div>You are viewing the log in page</div>
            </Route>
            <Route path="/signup">
              <div>You are viewing the sign up page</div>
            </Route>
            <Route key="search-dogs" path="/search" component={DogList}/>
            <Route key="home-page" exact path="/" component={DogList} />
          </Switch>
        </Router>
      </>
    );
  }
}
