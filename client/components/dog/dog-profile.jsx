import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, UncontrolledTooltip } from 'reactstrap';
import { useParams, Link } from 'react-router-dom';
import MakePlaydate from '../forms/make-playdate';
import PlaydatesList from '../listing/playdates-list';
import { convertEnergyLevel } from './../help/functions';
import { startCase, toLower } from 'lodash';

export default function DogProfile(props) {
  const genericPic = './../assets/images/unknown-dog.png';
  const params = useParams();
  const { id } = params;
  const { userID, userDogs } = props;
  const [dog, setDog] = useState({});
  const [images, setImages] = useState([]);
  const [activeTab, toggleTab] = useState('1');
  const setStateCallback = newState => setDog(newState);

  const getDog = signal => {
    fetch(`/api/get-dogs/${id}`, { signal })
      .then(res => res.json())
      .then(dog => {
        if (!dog.success) {
          throw new Error(dog.data);
        }
        // if less than 5 images, replace remaining images with generic photo
        let pics = dog.data.images;
        if (pics.length < 5) {
          let i = 5 - pics.length;
          while (i) {
            pics.push(genericPic);
            i--;
          }
        }
        setImages(pics);
        setDog(dog.data);
        toggleTab('1');
      });
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    getDog(signal);

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const imgRowStyle = {
    height: '40vh'
  };

  const smallerRows = {
    height: '20vh'
  };

  const primStyle = {
    backgroundImage: `url('${images[0]}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%'
  };

  const otherFour = [];
  for (let i = 1; i < 5; i++) {
    otherFour.push({
      backgroundImage: `url('${images[i]}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100%'
    });
  }

  return (
    <>
      <div className="dog-profile-images container-fluid px-0">
        <hr />
        <div className="row mx-auto" style={imgRowStyle}>
          <div className="col-sm-6" style={primStyle}></div>
          <div className="col-sm-6">
            <div className="row" style={smallerRows}>
              <div className="col d-none d-sm-block" style={otherFour[0]}></div>
              <div className="col d-none d-md-block" style={otherFour[2]}></div>
            </div>
            <div className="row" style={smallerRows}>
              <div className="col d-none d-sm-block" style={otherFour[1]}></div>
              <div className="col d-none d-md-block" style={otherFour[3]}></div>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-2 w-75"/>
      <div className="container-fluid dog-total-info">
        <div className="row">
          <div className="col-md-6 dog-information">
            <h2 className="d-inline">{dog.name} - </h2>
            <h3 className="d-inline-block capitalize">{startCase(toLower(dog.breed))}</h3>
            <div className="d-inline float-right">
              <span>Meet My Owner: </span>
              <Link to={`/user/${dog.user_id}`} className="btn dog-to-user">{dog.first} {dog.last}</Link>
            </div>
            <div className="font-weight-light mb-2">Location:
              <h6 className="d-inline mb-1"> {dog.display_address}</h6>
            </div>
            <h5>Details: </h5>
            <div className="dog-info-specs d-flex flex-wrap mb-1">
              <div className="mr-5" id={`gender-dog-profile${dog.id}`}>
                <i className="fas fa-transgender-alt oc-txt-blue" title="Gender"></i> {dog.sex}
                <UncontrolledTooltip placement="bottom" target={`gender-dog-profile${dog.id}`}>
                  Gender
                </UncontrolledTooltip>
              </div>
              <div className="mr-5" id={`age-dog-profile${dog.id}`}>
                <i className="fas fa-birthday-cake oc-txt-red" title="Age"></i> {dog.age}
                <UncontrolledTooltip placement="bottom" target={`age-dog-profile${dog.id}`}>
                  Age
                </UncontrolledTooltip>
              </div>
              <div className="mr-5" id={`weight-dog-profile${dog.id}`}>
                <i className="fas fa-dumbbell oc-weight-color" title="Weight"></i> {dog.weight} lbs
                <UncontrolledTooltip placement="bottom" target={`weight-dog-profile${dog.id}`}>
                  Weight
                </UncontrolledTooltip>
              </div>
              <div className="mr-5" id={`dates-dog-profile${dog.id}`}>
                <i className="fas fa-calendar-day oc-txt-brown" title="Number of Dates"></i> {dog.num_dates} dates
                <UncontrolledTooltip placement="bottom" target={`dates-dog-profile${dog.id}`}>
                  Number of Dates
                </UncontrolledTooltip>
              </div>
              <div className="mr-5" id={`energy-dog-profile${dog.id}`}>
                <i className="fas fa-bolt oc-txt-orange" title="Energy Level"></i> {convertEnergyLevel(dog.energy_lvl)}
                <UncontrolledTooltip placement="bottom" target={`energy-dog-profile${dog.id}`}>
                  Energy Level
                </UncontrolledTooltip>
              </div>
              <div className="mr-5" id={`fixed-dog-profile${dog.id}`}>
                <i className="fas fa-hand-scissors" title="Neutered/Spayed"></i> {dog.fixed ? 'Yes' : 'No'}
                <UncontrolledTooltip placement="bottom" target={`fixed-dog-profile${dog.id}`}>
                  Neutered/Spayed
                </UncontrolledTooltip>
              </div>
            </div>
            <h3>About {dog.name}</h3>
            <div>{dog.bio}</div>
          </div>
          <div className="col-md-6 dogs-listings">
            <h4>{dog.name}&apos;s Listings</h4>
            {(parseInt(userID) === parseInt(dog.user_id)
              ? <>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={(activeTab === '1') ? 'active' : ''}
                      onClick={() => { toggleTab('1'); }}
                    >
                    Listings
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={(activeTab === '2') ? 'active' : ''}
                      onClick={() => { toggleTab('2'); }}
                    >
                    Make Playdate
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <PlaydatesList dog={dog} userID={userID} userDogs={userDogs} setDogProfileState={setStateCallback} />
                  </TabPane>
                  <TabPane tabId="2">
                    <MakePlaydate userID={dog.user_id} dogID={dog.id} getDog={getDog}/>
                  </TabPane>
                </TabContent>
              </>
              : <PlaydatesList dog={dog} userID={userID} userDogs={userDogs} setDogProfileState={setStateCallback} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
