import React from 'react';
import DogCard from './dog-card';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
const qs = require('query-string');

export default class DogList extends React.Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      dogs: [],
      playdates: [],
      activeTab: '1'
    };
  }

  toggleTab(tab) {
    this.setState({ activeTab: tab });
  }

  componentDidUpdate(nextProps) {
    this.getDogs();
  }

  componentDidMount() {
    this.getDogs();
  }

  getDogs() {
    const query = qs.parse(location.search);
    if (Object.keys(query).includes('lat') && Object.keys(query).includes('lng')) {
      fetch('/api/get-dogs/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query)
      })
        .then(res => res.json())
        .then(res => {
          this.setState({ dogs: res.data });
        });
    } else if (Object.keys(query).includes('gender')) {
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
    const { dogs, activeTab } = this.state;
    return (
      <div className="container-fluid px-5">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={(activeTab === '1') ? 'active' : ''}
              onClick={() => { this.toggleTab('1'); }}
            >
              Dogs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={(activeTab === '2') ? 'active' : ''}
              onClick={() => { this.toggleTab('2'); }}
            >
              Playdates
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <h4>{dogs.length} Dogs Nearby</h4>
            <div className="row">
              {
                dogs.map(dog => <DogCard key={dog.id} dog={dog} />)
              }
            </div>
          </TabPane>
          <TabPane tabId="2">
            <h4>Playdate Listings</h4>
          </TabPane>
        </TabContent>

      </div>
    );
  }
}
