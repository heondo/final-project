import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import update from 'immutability-helper';
import UserDog from './user-dog';
import UserRequests from './user-requests';

export default function UserProfile(props) {
  const params = useParams();
  const { id } = params;
  const { userID } = props;
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
        user.user.requests = user.user.requests.filter(a => a.date > Date.now() / 1000).sort((a, b) => (a.date > b.date) ? 1 : -1);
        setUser(user.user);
      });
    return function cleanup() {
      abortController.abort();
    };
  }, [id]);

  const profPic = {
    width: '100%',
    paddingBottom: '30%',
    minHeight: 'auto',
    borderRadius: '50%',
    backgroundImage: `url("${user.image}")`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  };

  const userCardStyle = {
    maxWidth: '850px',
    backgroundImage: `url("/assets/images/paw-print.png")`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  const acceptRequest = (requestID, playdateID) => {
    // take in the request with its id
    // make a fetch request to the request yes or no api and yeah...
    const body = JSON.stringify({
      requestID
    });
    fetch('/api/playdate-request/accept', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw new Error(res.error.message);
        } else if (!res.success) {
          throw new Error(res.message);
        } else {
          const copyOfRequests = [...user.requests];
          copyOfRequests.forEach(req => {
            (req.id === requestID) ? req.accepted = 1 : '';
            (req.id !== requestID && parseInt(req.playdate_id) === parseInt(playdateID)) ? req.accepted = 0 : '';
          });
          const newUser = update(user, {
            requests: { $set: copyOfRequests }
          });
          setUser(newUser);
        }
      })
      .catch(error => console.error(error));
  };

  const denyRequest = requestID => {
    // take in the request with its id
    // make a fetch request to the request yes or no api and yeah...
    const body = JSON.stringify({
      requestID
    });
    fetch('/api/playdate-request/deny', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    })
      .then(res => res.json())
      .then(res => {
        if (!res.success) {
          throw new Error(res.message);
        } else if (res.error) {
          throw new Error(res.error.message);
        } else {
          const copyOfRequests = [...user.requests];
          copyOfRequests.forEach(req => {
            (req.id === requestID) ? req.accepted = 0 : '';
          });
          const newUser = update(user, {
            requests: { $set: copyOfRequests }
          });
          setUser(newUser);
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container-fluid dog-total-info">
      <hr />
      <div className="row">
        <div className="col-xl-6" style={userCardStyle}>
          <div className="user-profile-card mx-auto d-flex flex-column p-4">
            <div className="img-and-info row">
              <div className="col-3 prof-pic" style={profPic}></div>
              <div className="col-8 ml-2">
                <ul className="list-unstyled mt-3">
                  <li><h4>{user.first} {user.last}</h4></li>
                  <li>
                    <span className="d-inline-block">Location:</span>
                    <span className="d-inline col pl-1 mb-2">{user.display_address}</span>
                  </li>
                  <li><h6>Total Dates: {user.num_dates}</h6></li>
                </ul>
              </div>
            </div>
            <div className="bio my-2">
              <h5>Bio</h5>
              {user.bio}
            </div>
            {(userID === parseInt(id))
              ? <div className="open-requests">
                <h4>Open Requests</h4>
                <div className="requests-list w-100">
                  {(user.requests)
                    ? user.requests.map(req => {
                      return <UserRequests key={req.id} request={req} denyRequest={denyRequest} acceptRequest={acceptRequest}/>;
                    })
                    : <h5>You have no open requests</h5>}
                </div>
              </div>
              : undefined
            }
          </div>
        </div>
        <div className="col-xl-6">
          <div className="user-dogs-header w-75 mr-5 mb-3">
            {(userID === parseInt(id)) ? <h4>Your Dogs <Link to="/add-dog" className="float-right text-decoration-none">+New Dog</Link> </h4> : <h4>{`${user.first} ${user.last}'s Dogs`}</h4>}
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
