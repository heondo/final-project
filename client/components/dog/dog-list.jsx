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
    if (nextProps.location.pathname !== this.props.location.pathname || nextProps.location.search !== this.props.location.search) {
      const query = qs.parse(location.search);
      if (Object.keys(query).length) {
        fetch('/api/get-dogs/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(query)
        })
          .then(res => res.json())
          .then(res => {
            this.setState({ dogs: res.data });
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
  }

  componentDidMount() {
    const query = qs.parse(location.search);
    if (Object.keys(query).length) {
      fetch('/api/get-dogs/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query)
      })
        .then(res => res.json())
        .then(res => {
          this.setState({ dogs: res.data });
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
    if (this.props.filt) {
      return (
        <div className="">filterd dogs</div>
      );
    } else {
      return (
        <div className="container-fluid px-5">
          <h4>{dogs.length} Dogs Nearby</h4>
          <div className="row">
            {
              dogs.map(dog => <DogCard key={dog.id} dog={dog} />)
            }
          </div>
        </div>
      );
    }

  }
}
