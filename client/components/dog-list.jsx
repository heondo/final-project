import React from 'react';
import DogCard from './dog-card';

export default class DogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs: []
    };
  }

  componentDidMount() {
    fetch('/api/get-dogs/')
      .then(res => res.json())
      .then(dogs => this.setState({ dogs: dogs.data }));
  }

  render() {
    const { dogs } = this.state;
    return (
      <div className="container-fluid px-5">
        <div className="row">
          {
            dogs.map(dog => <DogCard key={dog.id} dog={dog} />)
          }
        </div>
      </div>
    );
  }
}
