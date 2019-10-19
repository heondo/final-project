import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserDog from './user-dog';

export default function UserProfile(props) {
  const params = useParams();
  const { id } = params;
  const [user, setUser] = useState({ dogs: [] });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch(`/api/get-users/${id}`, { signal })
      .then(res => res.json())
      .then(user => {
        if (!user.success) {
          throw new Error(user.data);
        }
        setUser(user.user);
      }); return function cleanup() {
      abortController.abort();
    };
  }, []);

  const profPic = {
    width: '100%',
    minHeight: '150px',
    backgroundImage: `url("${user.image}")`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div className="container-fluid px-5">
      <div className="row">
        <div className="col">
          <div className="user-profile-card w-75 mx-auto d-flex flex-column oc-bg-grey p-4">
            <div className="img-and-info row">
              <div className="col-5 prof-pic" style={profPic}>Prof Pic</div>
              <div className="col-6 ml-2">
                <ul className="list-unstyled mt-3">
                  <li><h4>{user.first} {user.last}</h4></li>
                  <li className="row">
                    <span className="d-inline-block ml-3">Location:</span>
                    <span className="d-inline col pl-1 mb-2">{user.display_address}</span>
                  </li>
                  <li><h6>Total Dates: {user.num_dates}</h6></li>
                </ul>
              </div>
            </div>
            <div className="bio mt-2">
              <h5>Bio</h5>
              {user.bio}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="user-dogs-header w-75 mr-5 mb-3">
            {(true) ? <h4>Your Dogs <Link to="/add-dog" className="float-right">+ New Dog</Link> </h4> : <h4>{`${user.first} ${user.last}'s Dogs`}</h4>}
          </div>
          <div className="users-dogs d-flex flex-wrap">
            {
              user.dogs.map(dog => {
                return <UserDog key={dog.id} dog={dog}/>;
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
