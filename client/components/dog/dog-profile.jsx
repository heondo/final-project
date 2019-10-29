import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { useParams, Link } from 'react-router-dom';
import MakePlaydate from '../forms/make-playdate';
import PlaydatesList from '../listing/playdates-list';

export default function DogProfile(props) {
  const genericPic = 'http://www.leighdogsandcatshome.co.uk/wp-content/uploads/2016/10/dog-outline.jpg';
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
      <div className="dog-profile-images container-fluid px-0 mb-2">
        <hr />
        <div className="row mx-auto" style={imgRowStyle}>
          <div className="col-sm-6" style={primStyle}></div>
          <div className="col-sm-6">
            <div className="row" style={smallerRows}>
              <div className="col d-none d-sm-block" style={otherFour[0]}>2</div>
              <div className="col d-none d-md-block" style={otherFour[2]}>4</div>
            </div>
            <div className="row" style={smallerRows}>
              <div className="col d-none d-sm-block" style={otherFour[1]}>3</div>
              <div className="col d-none d-md-block" style={otherFour[3]}>5</div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid px-5">
        <div className="row">
          <div className="col-md-6 dog-information">
            <h2 className="d-inline">{dog.name} - </h2>
            <h3 className="d-inline-block">{dog.breed}</h3>
            <Link to={`/user/${dog.user_id}`} className="float-right btn">{dog.first} {dog.last}</Link>
            <div className="font-weight-light mb-2">Location:
              <h6 className="d-inline mb-1"> {dog.display_address}</h6>
            </div>
            <h5>Details: </h5>
            <div className="dog-info-specs d-flex flex-wrap mb-1">
              <div className="mr-5">Gender: {dog.sex}</div>
              <div className="mr-5">Weight: {dog.weight}</div>
              <div className="mr-5">Age: {dog.age}</div>
              <div className="mr-5"># Dates: {dog.num_dates}</div>
              <div className="mr-5">Energy Level: {dog.energy_lvl}</div>
              <div className="mr-5">Neutered/Spayed: {dog.fixed}</div>
            </div>
            <h3>About {dog.name}</h3>
            <div>{dog.bio}</div>
          </div>
          <div className="col-md-6 dogs-listings">
            <h4>{dog.name}s Listings</h4>
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
