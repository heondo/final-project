import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Header from './help/header';
import DogList from './dog/dog-list';
import DogProfile from './dog/dog-profile';

export default class App extends React.Component {
  // change the view to....nearby-dogs
  // nearby-dogs: {}
  // dog-profile: {id: #}
  // user-profile: {id: #}

  render() {
    return (
      <Router>
        <Header />
        <hr />
        <Switch>
          <Route path="/dog/:id">
            <DogProfile />
          </Route>
          <Route path="/login">
            <div>You are viewing the log in page</div>
          </Route>
          <Route path="/signup">
            <div>You are viewing the sign up page</div>
          </Route>
          <Route exact path="/">
            <DogList />
          </Route>
        </Switch>
      </Router>
    );
  }
}
