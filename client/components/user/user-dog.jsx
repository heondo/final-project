import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, CardImg
} from 'reactstrap';
import { Link } from 'react-router-dom';

export default class UserDog extends React.Component {
  render() {
    const { dog } = this.props;
    const cardStyle = {
      border: 'none',
      overflow: 'hidden',
      borderTopLeftRadius: '1.5%',
      borderTopRightRadius: '1.5%'
    };
    const cardBodyStyle = {
      padding: '.25rem'
    };
    return (
      <div className="col-lg-6">
        <Card style={cardStyle} className="dog-list-card mb-3">
          <Link to={`/dog/${dog.id}`}>
            <CardImg top width="100%" src={dog.image} alt={`Photo of ${dog.name}`} />
            <CardBody style={cardBodyStyle}>
              <CardTitle className="mb-1"><p className="d-inline font-weight-bold">{dog.name}</p> - {dog.size} {dog.breed}</CardTitle>
              <CardSubtitle># Dates: {dog.num_dates}</CardSubtitle>
              <CardText>Enrgy: {dog.energy_lvl}, Sex: {dog.sex}, Age: {dog.age}</CardText>
            </CardBody>
          </Link>
        </Card>
      </div>
    );
  }
}
