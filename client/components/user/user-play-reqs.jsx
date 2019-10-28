import React, { useState, useEffect } from 'react';

export default function UserPlayReqs(props) {
  const [playReqs, setPlayReqs] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch(`/api/user-play-reqs/${props.userID}`, { signal })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw new Exception(res.message);
        }
        let newArr = res.playdates.concat(res.requests).sort((a, b) => (a.date > b.date) ? 1 : -1);
        setPlayReqs(newArr);
      })
      .catch(error => { console.error(error); });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const whichTypeDate = playOrReq => {
    if ('request_id' in playOrReq) {
      return <><Request data={playOrReq} /><hr/></>;
    } else {
      return <><CreatedPlaydate data={playOrReq} /> <hr /></>;
    }
  };

  const Request = props => {
    const { data } = props;
    const ownerDogStyle = {
      backgroundImage: "url('" + data.dog_image + "')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100px',
      height: '100px'
    };

    if (data.accepted === null) {
      return (
        <div className="row">
          <div className="col-lg-2" style={ownerDogStyle}></div>
          <div className="col-lg-2">
            <p>{`${data.other_dog_name} has not responded to meet with ${data.dog_name}`}
              <br/><br />Request Pending</p>
          </div>
        </div>
      );
    } else if (data.accepted === 0) {
      return (
        <div className="row">
          <div className="col-lg-2" style={ownerDogStyle}></div>
          <div className="col-lg-2">
            <p>{`${data.other_dog_name} does not wish to meet with ${data.dog_name} :(`}
              <br /><br/><strong>Request Denied</strong></p>
          </div>
        </div>
      );
    } else if (data.accepted === 1) {
      return (
        <div className="row">
          <div className="col-lg-2" style={ownerDogStyle}></div>
          <div className="col-lg-2">
            <p>{`${data.other_dog_name} has agreed to meet with ${data.dog_name}!`}
              <br /><br/><strong>Request Accepted</strong></p>
          </div>
        </div>
      );
    }
  };

  const CreatedPlaydate = props => {
    const { data } = props;
    const ownerDogStyle = {
      backgroundImage: "url('" + data.dog_image + "')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100px',
      height: '100px'
    };

    return (data.confirmed)
      ? <div className="row">
        <div className="col-lg-2" style={ownerDogStyle}></div>
        <div className="col-lg-2">
          <p>{`${data.dog_name} is meeting with ${data.req_dog_name}`}
            <br /><br/><strong>Playdate Confirmed</strong></p>
        </div>
      </div>
      : <div className="row">
        <div className="col-lg-2" style={ownerDogStyle}></div>
        <div className="col-lg-2">{`${data.dog_name} is not meeting with anyone...yet!`}
          <br /><br/><strong>Playdate Still Open</strong></div>
      </div>;
  };

  return (
    <div className="container-fluid mx-5">
      <h4>My Playdates and Requests</h4>
      <div className="d-flex flex-column">
        {
          (playReqs) ? playReqs.map(pr => {
            return whichTypeDate(pr);
          }) : <h5>No upcoming playdates or requests</h5>
        }
      </div>
    </div>
  );
}
