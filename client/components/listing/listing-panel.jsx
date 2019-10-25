import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Media, Button } from 'reactstrap';
import { calculateWeightClass, convertEnergyLevel, convertDate, formatBreedName } from '../help/functions';

export default function ListingPanel(props) {
  const { dog: dogInfo } = props;
  const playdates = dogInfo.playdates;
  const weightClass = calculateWeightClass(dogInfo.weight);
  const energyLevel = convertEnergyLevel(dogInfo.energy_lvl);
  const breed = formatBreedName(dogInfo.breed);
  return (
    <>
      <Media>

        <Media left>
          <Media object src={dogInfo.images[0]} alt={dogInfo.name} style={{ maxWidth: '12rem' }} />
        </Media>

        <Media body>
          <Container fluid>
            <Row>

              <Col xs='4' className="pl-4">
                <h3>{dogInfo.name}</h3>
                <h6 className="text-muted">{breed + ' - ' + weightClass}</h6>
                <p className="mb-1">Gender: {dogInfo.sex}, Age: {dogInfo.age}, Energy Level: {energyLevel}</p>
                <p>Playdates Attended: {dogInfo.num_dates}</p>
              </Col>

              <Col xs='6' className="px-2">
                <h4>Upcoming Playdates</h4>
                {playdates
                  .filter((playdate, index) => index <= 2)
                  .map(playdate => {
                    const displayDate = convertDate(playdate.date);
                    if (playdate.confirmed) {
                      return <p key={playdate.id} className="mb-1"><s>{displayDate + ' - ' + playdate.display_address}</s></p>;
                    } else {
                      return <p key={playdate.id} className="mb-1">{displayDate + ' - ' + playdate.display_address}</p>;
                    }
                  })
                }
              </Col>

              <Col xs='2' className="d-flex justify-content-end align-items-center">
                <Link to={`/dog/${dogInfo.id}`}>
                  <Button color="primary" outline>View Profile</Button>
                </Link>
              </Col>

            </Row>
          </Container>
        </Media>

      </Media>
      <hr />
    </>
  );
}
