import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { convertDate, convertEnergyLevel } from './../help/functions';

export default function UserRequests(props) {
  const { id, date, name, user_id, accepted, req_energy, req_weight,
    dog_id, playdate_id, request_name, request_user, request_image,
    request_dog_id, display_address, num_dates } = props.request;

  const requestImageStyle = {
    backgroundImage: `url('${request_image}')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%'
  };

  useEffect(() => {}, [accepted]);

  const handleDeny = () => {
    props.denyRequest(id);
  };

  const handleAccept = () => {
    props.acceptRequest(id, playdate_id);
  };

  function YesOrNo() {
    return (
      <>
        <button className="btn btn-success d-inline-block mb-2 mr-1" onClick={handleAccept}>
          YES
        </button>
        <button className="btn btn-warning d-inline-block mb-2" onClick={handleDeny}>
          NO
        </button>
      </>
    );
  }

  function Rejected() {
    return (
      <>
        <button className="btn btn-secondary d-block mb-2" disabled>
          Rejected
        </button>
      </>
    );
  }

  function Accepted() {
    return (
      <>
        <button className="btn btn-success d-block mb-2" disabled>
          Accepted
        </button>
      </>
    );
  }

  return (
    <div className="requests-item row">
      <Link className='col-md-2' to={`/dog/${request_dog_id}`}>
        <div className="requester" style={requestImageStyle} ></div>
      </Link>
      <div className="col-md-4 mx-0 px-0">
        <p className="mb-0"><strong>{request_name}</strong> wants to meet <strong>{name}</strong></p>
        <ul className="list-unstyled">
          <li><i className="fas fa-bolt" title="Energy Level"></i> {convertEnergyLevel(req_energy)}</li>
          <li><i className="fas fa-dumbbell" title="weight"></i> {req_weight} lbs</li>
          <li><i className="fas fa-calendar-day" title="Number of Dates"></i> {num_dates} dates</li>
        </ul>
      </div>
      <div className="col-md-4 col-8 d-flex flex-column mx-0 px-0 d-inline-block">
        <div className="d-inline user-req-details">Details</div>
        <ul className="list-unstyled">
          <li>{display_address}</li>
          <li>{convertDate(date)}</li>
        </ul>
      </div>
      <div className="col-md-1 col-3 my-auto mx-0 px-0 float-right d-flex justify-content-center">
        {(accepted === null) ? <YesOrNo /> : (accepted === 0) ? <Rejected /> : <Accepted />}
      </div>
    </div>
  );
}
