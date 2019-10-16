import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function DogProfile(props) {
  const genericPic = 'http://www.leighdogsandcatshome.co.uk/wp-content/uploads/2016/10/dog-outline.jpg';
  const params = useParams();
  const { id } = params;
  const [dog, setDog] = useState({});

  useEffect(() => {
    fetch(`/api/get-dogs/${id}`)
      .then(res => res.json())
      .then(dogs => {
        if (!dogs.success) {
          throw new Error(dogs.data);
        }
        setDog(dogs.data);
      });
  });

  return (
    <>
      <div className="dog-profile-images">
        MANY IMAGES ARE GOING HERE AIRBNB STYLE
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
