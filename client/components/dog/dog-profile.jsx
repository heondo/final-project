import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function DogProfile(props) {
  const genericPic = 'http://www.leighdogsandcatshome.co.uk/wp-content/uploads/2016/10/dog-outline.jpg';
  const params = useParams();
  const { id } = params;
  const [dog, setDog] = useState({});
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`/api/get-dogs/${id}`)
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
  });

  const imgRowStyle = {
    height: '50vh'
  };

  const smallerRows = {
    height: '50%'
  };

  const primStyle = {
    backgroundImage: `url('${images[0]}')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%'
  };

  const otherFour = [];
  for (let i = 1; i < 5; i++) {
    otherFour.push({
      backgroundImage: `url('${images[i]}')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100%'
    });
  }

  return (
    <>
      <div className="dog-profile-images container-fluid px-0">
        <div className="row" style={imgRowStyle}>
          <div className="col" style={primStyle}></div>
          <div className="col">
            <div className="row" style={smallerRows}>
              <div className="col" style={otherFour[0]}></div>
              <div className="col" style={otherFour[1]}></div>
            </div>
            <div className="row" style={smallerRows}>
              <div className="col" style={otherFour[2]}></div>
              <div className="col" style={otherFour[3]}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mx-5">
        <h2 className="d-inline">{dog.name} - </h2><h3 className="d-inline-block">{dog.breed}</h3>
        <div>Location: <h6 className="d-inline">{dog.display_address}</h6></div>
        <h5>Details: </h5>
        <div className="dog-info-specs">
          This is where I put weight, sex, age, energy level, number of dates yolo
        </div>
      </div>
    </>
  );
}
