import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import DogSmCarousel from './dog-sm-carousel';

export default class DogCard extends React.Component {
  render() {
    const { dog } = this.props;
    const cardStyle = {
      border: 'none'
    };
    const cardBodyStyle = {
      padding: '.25rem'
    };
    return (
      <div className="col-lg-3 col-md-4 col-sm-6">
        <Card style={cardStyle}>
          <DogSmCarousel items={dog.images}/>
          <CardBody style={cardBodyStyle}>
            <CardTitle className="mb-1"><p className="d-inline font-weight-bold">{dog.name}</p> - {dog.size} {dog.breed}</CardTitle>
            <CardSubtitle># Dates: {dog.num_dates}, {dog.location}</CardSubtitle>
            <CardText>Enrgy: {dog.energy_lvl}, Sex: {dog.sex}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}
