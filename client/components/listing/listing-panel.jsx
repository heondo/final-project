import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Badge, UncontrolledTooltip } from 'reactstrap';
import { calculateWeightClass, convertEnergyLevel, convertDate, formatBreedName } from '../help/functions';

export default function ListingPanel(props) {
  const { dog: dogInfo } = props;
  const playdates = dogInfo.playdates.sort((a, b) => (a.date > b.date) ? 1 : -1);
  const weightClass = calculateWeightClass(dogInfo.weight);
  const energyLevel = convertEnergyLevel(dogInfo.energy_lvl);
  const breed = formatBreedName(dogInfo.breed);
  const maxPlaydatesToDisplay = 3;
  return (
    <>
      <Row>
        <Col md="2">
          <Link to={`/dog/${dogInfo.id}`}>
            <img src={dogInfo.images[0]} alt={dogInfo.name} style={{ maxWidth: '100%', borderRadius: '3px' }} />
          </Link>
        </Col>

        <Col md='3'>
          <h3>{dogInfo.name}</h3>
          <h6 className="text-muted">{breed + ' - ' + weightClass}</h6>
          <span className="mr-2" id={`age-listing-panel${dogInfo.id}`}>
            <i className="fas fa-birthday-cake oc-txt-red" title="Age"></i> {dogInfo.age}
            <UncontrolledTooltip placement="bottom" target={`age-listing-panel${dogInfo.id}`}>
              Age
            </UncontrolledTooltip>
          </span>
          <span className="mr-2" id={`gender-listing-panel${dogInfo.id}`}>
            <i className="fas fa-transgender-alt oc-txt-blue" title="Gender"></i>
            {' '}{dogInfo.sex}
            <UncontrolledTooltip placement="bottom" target={`gender-listing-panel${dogInfo.id}`}>
              Gender
            </UncontrolledTooltip>
          </span>
          <span id={`energy-listing-panel${dogInfo.id}`}>
            <i className="fas fa-bolt oc-txt-orange" title="Energy Level"></i>
            {' '}{
              (energyLevel === 'Medium') ? 'Med' : energyLevel
            }
            <UncontrolledTooltip placement="bottom" target={`energy-listing-panel${dogInfo.id}`}>
              Energy Level
            </UncontrolledTooltip>
          </span>
          <br />
          <div className="d-inline-block mt-2" id={`dates-listing-panel${dogInfo.id}`}>
            <i className="fas fa-calendar-day oc-txt-brown" title="Number of Dates"></i>
            {' '}{dogInfo.num_dates} dates attended
            <UncontrolledTooltip placement="bottom" target={`dates-listing-panel${dogInfo.id}`}>
              Number of Dates
            </UncontrolledTooltip>
          </div>
        </Col>

        <Col md='5' className="upcoming-playdates">
          <h4>Upcoming Playdates</h4>
          {playdates
            .filter((playdate, index) => index <= maxPlaydatesToDisplay - 1)
            .map(playdate => {
              const displayDate = convertDate(playdate.date);
              if (playdate.confirmed) {
                return (
                  <p key={playdate.id} className="mb-1">
                    <s>{displayDate + ' - ' + playdate.display_address}</s>
                    <Badge className="ml-2" style={{ backgroundColor: '#bfbfbf' }}>Playdate Full!</Badge>
                  </p>);
              } else {
                return <p key={playdate.id} className="mb-1">{displayDate + ' - ' + playdate.display_address}</p>;
              }
            })
          }
        </Col>

        <Col md='2' className="d-none d-md-flex justify-content-end align-items-center">
          <Link to={`/dog/${dogInfo.id}`}>
            <button className="oc-bg-grey oc-btn-grey btn active" aria-pressed="true">View Profile</button>
          </Link>
        </Col>
        <Col md='2' className="d-flex d-md-none justify-content-center align-items-center">
          <Link to={`/dog/${dogInfo.id}`} className="mt-3">
            <button className="oc-bg-grey oc-btn-grey btn active" aria-pressed="true">View Profile</button>
          </Link>
        </Col>

      </Row>
      <hr />
    </>
  );
}
