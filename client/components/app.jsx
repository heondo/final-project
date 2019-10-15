import React, { useState } from 'react';
import Header from './help/header';
import DogList from './dog/dog-list';
import DogProfile from './dog/dog-profile';

export default class App extends React.Component {
  // change the view to....nearby-dogs
  // nearby-dogs: {}
  // dog-profile: {id: #}
  // user-profile: {id: #}
  constructor(props) {
    super(props);
    this.state = {
      view: {
        views: 'nearby-dogs',
        params: {}
      }
    };
  }

  checkViews() {
    const { views, params } = this.state.view;
    switch (views) {
      case 'nearby-dogs':
        return <DogList />;
      case 'dog-profile':
        console.log();
        return <DogProfile dogID={params.id}/>;
    }
  }

  render() {
    return (
      <>
        <Header />
        {
          this.checkViews()
        }
      </>
    );
  }
}
