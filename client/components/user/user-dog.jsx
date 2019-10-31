import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, CardImg, UncontrolledTooltip
} from 'reactstrap';
import { startCase, toLower } from 'lodash';
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
    const imgSize = {
      minHeight: '250px',
      backgroundImage: `url("${dog.image}")`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    };
    return (
      <div className="col-md-6">
        <Card style={cardStyle} className="dog-list-card mb-3">
          <Link to={`/dog/${dog.id}`}>
            <div style={imgSize} className="card-img-top" />
            <CardBody style={cardBodyStyle}>
              <CardTitle className="mb-1">
                <p className="d-inline font-weight-bold">
                  {dog.name}
                </p> - {startCase(toLower(dog.breed))}
                <span className="float-right" id={`weight-user-dog${dog.id}`}>
                  <i className="fas fa-dumbbell oc-weight-color" title="Weight"></i> {dog.weight} lbs
                  <UncontrolledTooltip placement="bottom" target={`weight-user-dog${dog.id}`}>
                    Weight
                  </UncontrolledTooltip>
                </span>
              </CardTitle>
              <CardSubtitle className="d-inline-block" id={`age-user-dog${dog.id}`}>
                <i className="fas fa-birthday-cake oc-txt-red" title="Age"></i> {dog.age}
                <UncontrolledTooltip placement="bottom" target={`age-user-dog${dog.id}`}>
                  Age
                </UncontrolledTooltip>
              </CardSubtitle>
              <CardText>
                <span className="mr-3" id={`gender-user-dog${dog.id}`}>
                  <i className="fas fa-transgender-alt oc-txt-blue" title="Gender"></i> {dog.sex},
                  <UncontrolledTooltip placement="bottom" target={`gender-user-dog${dog.id}`}>
                    Gender
                  </UncontrolledTooltip>
                </span>
                <span className="mr-3" id={`dates-user-dog${dog.id}`}>
                  <i className="fas fa-calendar-day oc-txt-brown" title="Number of Dates"></i> {dog.num_dates} dates,
                  <UncontrolledTooltip placement="bottom" target={`dates-user-dog${dog.id}`}>
                    Number of Dates
                  </UncontrolledTooltip>
                </span>
                <span className="mr-3" id={`energy-user-dog${dog.id}`}>
                  <i className="fas fa-bolt oc-txt-orange" title="Energy Level"></i> {convertEnergyLevel(dog.energy_lvl)}
                  <UncontrolledTooltip placement="bottom" target={`energy-user-dog${dog.id}`}>
                    Energy Level
                  </UncontrolledTooltip>
                </span>
              </CardText>
            </CardBody>
          </Link>
        </Card>
      </div>
    );
  }
}
