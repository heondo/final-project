import React, { useState } from 'react';
import Header from './header';
import DogList from './dog-list';

export default function App(props) {
  // change the view to....nearby-dogs
  // dog-profile: {id: #}
  // user-profile: {id: #}
  //
  const [view, setView] = useState({
    views: 'nearby-dogs',
    params: {}
  });

  const checkViews = () => {
    switch (view.views) {
      case 'nearby-dogs':
        return <DogList />;
    }
  };

  return (
    <>
      <Header />
      {
        checkViews()
      }
    </>
  );
}
