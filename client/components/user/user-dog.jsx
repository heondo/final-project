import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, CardImg
} from 'reactstrap';
import { capitalize } from 'lodash';
import { convertEnergyLevel } from './../help/functions';
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
      <div className="col-md-6">
        <Card style={cardStyle} className="dog-list-card mb-3">
          <Link to={`/dog/${dog.id}`}>
            <CardImg top width="100%" src={dog.image} alt={`Photo of ${dog.name}`} />
            <CardBody style={cardBodyStyle}>
              <CardTitle className="mb-1">
                <p className="d-inline font-weight-bold">
                  {dog.name}
                </p> - {capitalize(dog.breed)} <span className="float-right">
                  <i className="fas fa-dumbbell" title="Weight"></i> {dog.weight} lbs</span>
              </CardTitle>
              <CardSubtitle>
                <i className="fas fa-birthday-cake" title="Age"></i> {dog.age}</CardSubtitle>
              <CardText>
                <span className="mr-3">
                  <i className="fas fa-transgender-alt" title="Gender"></i> {dog.sex},
                </span>
                <span className="mr-3">
                  <i className="fas fa-calendar-day" title="Number of Dates"></i> {dog.num_dates} dates,
                </span>
                <span className="mr-3">
                  <i className="fas fa-bolt" title="Energy Level"></i> {convertEnergyLevel(dog.energy_lvl)}
                </span>
              </CardText>
            </CardBody>
          </Link>
        </Card>
      </div>
    );
  }
}
