import React from 'react';
import DogCard from './dog-card';
const qs = require('query-string');

export default class DogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs: []
    };
  }

  componentDidUpdate(nextProps) {
    this.getDogs();
  }

  componentDidMount() {
    this.getDogs();
  }

  getDogs() {
    const query = qs.parse(location.search);
    if (Object.keys(query).length) {
      const extractedQueryString = qs.extract(location.search);
      fetch('/api/get-dogs/?' + extractedQueryString)
        .then(res => res.json())
        .then(dogs => {
          if (!dogs.success) {
            throw new Error(dogs.data);
          }
          this.setState({ dogs: dogs.data });
        });
    } else {
      fetch('/api/get-dogs/')
        .then(res => res.json())
        .then(dogs => {
          if (!dogs.success) {
            throw new Error(dogs.data);
          }
          this.setState({ dogs: dogs.data });
        });
    }
  }

  render() {
    const { dogs } = this.state;
    let dogListHeadingText = ' Dogs Nearby';
    if (dogs.length === 1) {
      dogListHeadingText = ' Dog Nearby';
    }
    return (
      <div className="container-fluid px-5">
        <h4>{dogs.length + dogListHeadingText}</h4>
        <div className="row">
          {
            dogs.map(dog => <DogCard key={dog.id} dog={dog} />)
          }
        </div>
      </div>
    );
  }
}
