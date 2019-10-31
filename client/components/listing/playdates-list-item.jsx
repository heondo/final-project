import React from 'react';
import update from 'immutability-helper';
import { Row, Col, Badge, Input } from 'reactstrap';
import { convertDate } from '../help/functions';

export default class PlaydatesListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRequestToJoin = this.handleRequestToJoin.bind(this);
    this.handleDeletePlaydate = this.handleDeletePlaydate.bind(this);
    this.state = {
      selectedDog: this.props.userDogs == null || !this.props.userDogs.length ? '' : this.props.userDogs[0].id
    };
  }

  handleChange(event) {
    this.setState({ selectedDog: event.target.value });
  }

  handleRequestToJoin(playdateID, requestDogID) {
    const postRequestBody = {
      playdateID: parseInt(playdateID),
      dogID: parseInt(requestDogID)
    };
    fetch('/api/playdate-request/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postRequestBody)
    })
      .then(res => res.json())
      .then(newRequest => {
        if (!newRequest.success) {
          throw new Error(newRequest.message);
        } else if (newRequest.error) {
          throw new Error(newRequest.message);
        }
        let playdateIndex = null;
        let updatedPlaydatesArray = null;
        let updatedDogData = null;
        for (let i in this.props.dog.playdates) {
          if (this.props.dog.playdates[i].id === parseInt(playdateID)) {
            playdateIndex = i;
          }
        }
        if (this.props.dog.playdates[playdateIndex].requested_users == null) {
          const updatedRequestedUsers = [this.props.userID.toString()];
          updatedPlaydatesArray = update(this.props.dog.playdates, {
            [playdateIndex]: { requested_users: { $set: updatedRequestedUsers } }
          });
          updatedDogData = update(this.props.dog, {
            playdates: { $set: updatedPlaydatesArray }
          });
        } else {
          updatedPlaydatesArray = update(this.props.dog.playdates, {
            [playdateIndex]: { requested_users: { $push: [this.props.userID.toString()] } }
          });
          updatedDogData = update(this.props.dog, {
            playdates: { $set: updatedPlaydatesArray }
          });
        }
        this.props.setDogProfileState(updatedDogData);
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleDeletePlaydate(playdateID) {
    const deleteRequestBody = { playdateID: parseInt(playdateID) };
    fetch('/api/add-playdates/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deleteRequestBody)
    })
      .then(res => res.json())
      .then(deleteResponse => {
        if (!deleteResponse.success) {
          throw new Error(deleteResponse.message);
        } else if (deleteResponse.error) {
          throw new Error(deleteResponse.message);
        }
        const updatedPlaydatesArray = this.props.dog.playdates.filter(playdate => playdate.id !== playdateID);
        const updatedDogData = update(this.props.dog, {
          playdates: { $set: updatedPlaydatesArray }
        });
        this.props.setDogProfileState(updatedDogData);
      })
      .catch(error => {
        throw new Error(error);
      });
  }

  render() {
    const { userID, userDogs, playdate, ownerID } = this.props;
    const displayDate = convertDate(playdate.date);

    if (userID == null || !userDogs.length) {
      return (
        <Row className="my-2">
          {playdate.confirmed
            ? <Col md="10">
              <s>{displayDate + ' - ' + playdate.display_address}</s>
              <Badge className="ml-2" style={{ backgroundColor: '#bfbfbf' }}>Playdate Full!</Badge>
            </Col>
            : <Col md="10">
              {displayDate + ' - ' + playdate.display_address}
            </Col>}
        </Row>
      );
    } else if (playdate.requested_users != null && playdate.requested_users.includes(userID.toString())) {
      return (
        <Row className="my-2">
          <Col xs="9">
            <span className="text-muted">{displayDate + ' - ' + playdate.display_address}</span>
          </Col>
          <Col xs={{ size: 2, offset: 1 }}>
            {userID === ownerID
              ? <button className="oc-bg-red btn btn-sm float-right" disabled>Delete Playdate</button>
              : <button className="oc-bg-blue btn btn-sm float-right" disabled>Request Sent</button>
            }
          </Col>
        </Row>
      );
    } else if (playdate.confirmed) {
      return (
        <Row className="my-2">
          <Col xs="9">
            <s>{displayDate + ' - ' + playdate.display_address}</s>
            <Badge className="ml-2" style={{ backgroundColor: '#bfbfbf' }}>Playdate Full!</Badge>
          </Col>
          <Col xs={{ size: 2, offset: 1 }}>
            {userID === ownerID
              ? <button className="oc-bg-red btn btn-sm float-right" disabled>Delete Playdate</button>
              : <button className="oc-bg-blue btn btn-sm float-right" disabled>Request to Join</button>
            }
          </Col>
        </Row>
      );
    } else {
      return (
        <Row className="my-2">
          <Col xs="8">
            {displayDate + ' - ' + playdate.display_address}
          </Col>
          <Col xs="4">
            {userID === ownerID
              ? <button
                className="oc-bg-red oc-btn-red btn btn-sm active float-right"
                onClick={() => this.handleDeletePlaydate(playdate.id)}>
                  Delete Playdate
              </button>
              : <div className="d-flex justify-content-end">
                <Input
                  type="select"
                  bsSize="sm"
                  className="d-inline"
                  style={{ width: 'initial' }}
                  value={this.state.selectedDog}
                  onChange={this.handleChange}>
                  {userDogs.map(dog => <option key={dog.id} value={dog.id}>{dog.name}</option>)}
                </Input>
                <button
                  className="oc-bg-blue oc-btn-blue btn btn-sm active d-inline ml-1"
                  onClick={() => this.handleRequestToJoin(playdate.id, this.state.selectedDog)}>
                    Request to Join
                </button>
              </div>
            }
          </Col>
        </Row>
      );
    }
  }
}
