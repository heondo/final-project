import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function DogProfile(props) {
  const genericPic = 'http://www.leighdogsandcatshome.co.uk/wp-content/uploads/2016/10/dog-outline.jpg';
  const params = useParams();
  const { id } = params;
  const [dog, setDog] = useState({});
  const [images, setImages] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
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
      });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const imgRowStyle = {
    height: '50vh'
  };

  const smallerRows = {
    height: '50%'
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
          <div className="col" style={primStyle}></div>
          <div className="col">
            <div className="row" style={smallerRows}>
              <div className="col" style={otherFour[0]}>2</div>
              <div className="col" style={otherFour[2]}>4</div>
            </div>
            <div className="row" style={smallerRows}>
              <div className="col" style={otherFour[1]}>3</div>
              <div className="col" style={otherFour[3]}>5</div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid px-5">
        <div className="row">
          <div className="col dog-information">
            <h2 className="d-inline">{dog.name} - </h2>
            <h3 className="d-inline-block">{dog.breed}</h3>
            <Link to={`/user/${dog.user_id}`} className="float-right btn">{dog.first} {dog.last}</Link>
            <div className="font-weight-light">Location:
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
          <div className="col"></div>
        </div>

      </div>
    </>
  );
}
