import React from 'react';
import update from 'immutability-helper';
import { Row, Col, Button, Badge, Input } from 'reactstrap';
import { convertDate } from '../help/functions';

export default class PlaydatesListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRequestToJoin = this.handleRequestToJoin.bind(this);
    this.state = {
      selectedDog: ''
    };
  }

  handleChange(event) {
    this.setState({ selectedDog: event.target.value });
  }

  handleRequestToJoin(playdateID, requestDogID) {
    const requestBody = {
      playdateID: parseInt(playdateID),
      dogID: parseInt(requestDogID)
    };
    fetch('/api/playdate-request/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    })
      .then(res => res.json())
      .then(newRequest => {
        if (!newRequest.success) {
          throw new Error(newRequest.message);
        }
        console.log('Sent request to join playdate!', newRequest);
        // TODO: do something after they make request, maybe redirect to their schedule page?
      })
      .catch(error => {
        throw new Error(error);
      });
  }

  // handleDeletePlaydate() { }

  render() {
    const { userID, userDogs, playdate, ownerID } = this.props;
    const displayDate = convertDate(playdate.date);

    if (playdate.confirmed) {
      return (
        <Row className="my-2">
          <Col xs="9">
            <s>{displayDate + ' - ' + playdate.display_address}</s>
            <Badge className="ml-2" style={{ backgroundColor: '#bfbfbf' }}>Playdate Full!</Badge>
          </Col>
          <Col xs={{ size: 2, offset: 1 }}>
            {userID === ownerID
              ? <Button size="sm" color="danger" className="float-right" outline disabled>Delete Playdate</Button>
              : <Button size="sm" className="float-right" outline disabled>Request to Join</Button>
            }
          </Col>
        </Row>
      );
    } else {
      return (
        <Row className="my-2">
          <Col xs="9">
            {displayDate + ' - ' + playdate.display_address}
          </Col>
          <Col xs="3">
            {userID === ownerID
              ? <Button size="sm" color="danger" className="float-right" outline>Delete Playdate</Button>
              : <>
                <Input
                  type="select"
                  bsSize="sm"
                  className="d-inline"
                  style={{ width: 'initial' }}
                  value={this.state.selectedDog}
                  onChange={this.handleChange}>
                  {userDogs.map(dog => <option key={dog.id} value={dog.id}>{dog.name}</option>)}
                </Input>
                <Button
                  size="sm"
                  color="primary"
                  className="float-right"
                  onClick={() => this.handleRequestToJoin(playdate.id, this.state.selectedDog)}
                  outline>
                    Request to Join
                </Button>
              </>
            }
          </Col>
        </Row>
      );
    }
  }
}
