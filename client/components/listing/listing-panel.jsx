import React from 'react';
import { Container, Row, Col, Media, Button } from 'reactstrap';
// import { Link } from 'react-router-dom';
import { calculateWeightClass, convertEnergyLevel, convertDate, formatBreedName } from '../help/functions';

export default function ListingPanel(props) {
  const { dog: dogInfo } = props;
  const playdates = dogInfo.playdates;
  const weightClass = calculateWeightClass(dogInfo.weight);
  const energyLevel = convertEnergyLevel(dogInfo.energy_lvl);
  const breed = formatBreedName(dogInfo.breed);
  return (
    <div>
      <Media>
        {/* <Link to={`/dog/${dogInfo.id}`}> */}

        <Media left>
          <Media object src={dogInfo.image} alt={dogInfo.name} style={{ 'max-width': '12rem' }} />
        </Media>

        <Media body>
          <Container>
            <Row>

              <Col xs='auto' className="ml-3">
                <h3>{dogInfo.name}</h3>
                <h6 className="text-muted">{breed + ' - ' + weightClass}</h6>
                <p className="mb-1">Gender: {dogInfo.sex}, Age: {dogInfo.age}, Energy Level: {energyLevel}</p>
                <p>Playdates Attended: {dogInfo.num_dates}</p>
              </Col>

              <Col xs={{ size: 'auto', offset: 1 }}>
                <h4>Upcoming Playdates</h4>
                {playdates
                  .filter((playdate, index) => index <= 2)
                  .map(playdate => {
                    const displayDate = convertDate(playdate.date);
                    return <p key={playdate.id} className="mb-1">{displayDate + ' - ' + playdate.display_address}</p>;
                  })
                }
              </Col>

              <Col xs={{ size: 'auto', offset: 1 }} className="d-flex justify-content-center align-items-center">
                <Button color="primary" outline>View Profile</Button>
              </Col>

            </Row>
          </Container>
        </Media>

        {/* </Link> */}
      </Media>
      <hr />
    </div>
  );
}

// TODO: Fix indent in render
