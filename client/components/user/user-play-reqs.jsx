import React, { useState, useEffect } from 'react';
import { convertDate } from './../help/functions';

export default function UserPlayReqs(props) {
  const [playReqs, setPlayReqs] = useState([]);
  const { history } = props;

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

    const otherDogStyle = {
      backgroundImage: "url('" + data.other_dog_url + "')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100px',
      height: '100px',
      cursor: 'pointer'
    };

    if (data.accepted === null) {
      return (
        <div className="row justify-content-center">
          <div className="col-lg-1" style={ownerDogStyle}></div>
          <div className="col-lg-3">
            <p>{`${data.other_dog_name} has not responded to meet with ${data.dog_name}`}
              <br /><br /><strong>Request Pending</strong></p>
          </div>
          <div className="col-lg-1" style={otherDogStyle} onClick={() => {
            history.push(`/dog/${data.other_dog_id}`);
          }}></div>
          <div className="col-lg-2">
            Meeting on {convertDate(data.date)}
          </div>
          <div className="col-lg-2">
            Meeting Location: <br /> {data.display_address}
          </div>
        </div>
      );
    } else if (data.accepted === 0) {
      return (
        <div className="row justify-content-center">
          <div className="col-lg-1" style={ownerDogStyle} ></div>
          <div className="col-lg-3">
            <p>{`${data.other_dog_name} does not wish to meet with ${data.dog_name} :(`}
              <br /><br/><strong>Request Denied</strong></p>
          </div>
          <div className="col-lg-1" style={otherDogStyle} onClick={() => {
            history.push(`/dog/${data.other_dog_id}`);
          }}></div>
          <div className="col-lg-2">
            Meeting on {convertDate(data.date)}
          </div>
          <div className="col-lg-2">
            Meeting Location: <br /> {data.display_address}
          </div>
        </div>
      );
    } else if (data.accepted === 1) {
      return (
        <div className="row justify-content-center">
          <div className="col-lg-1" style={ownerDogStyle}></div>
          <div className="col-lg-3">
            <p>{`${data.other_dog_name} has agreed to meet with ${data.dog_name}!`}
              <br /><br/><strong>Request Accepted</strong></p>
          </div>
          <div className="col-lg-1" style={otherDogStyle} onClick={() => {
            history.push(`/dog/${data.other_dog_id}`);
          }}></div>
          <div className="col-lg-2">
            Meeting on {convertDate(data.date)}
          </div>
          <div className="col-lg-2">
            Meeting Location: <br /> {data.display_address}
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

    let reqDogImage = (data.req_dog_url) ? data.req_dog_url : './../assets/unknown-dog.png';
    const otherDogStyle = {
      backgroundImage: "url('" + reqDogImage + "')",
      backgroundSize: (data.req_dog_url) ? 'cover' : 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100px',
      height: '100px',
      cursor: (data.req_dog_url) ? 'pointer' : 'default'
    };

    return (data.confirmed)
      ? <div className="row justify-content-center">
        <div className="col-lg-1" style={ownerDogStyle}></div>
        <div className="col-lg-3">
          <p>{`${data.dog_name} is meeting with ${data.req_dog_name}`}
            <br /><br/><strong>Playdate Confirmed</strong></p>
        </div>
        <div className="col-lg-1" style={otherDogStyle} onClick={() => {
          history.push(`/dog/${data.req_dog_id}`);
        }}></div>
        <div className="col-lg-2">
          Meeting on {convertDate(data.date)}
        </div>
        <div className="col-lg-2">
          Meeting Location: <br /> {data.display_address}
        </div>
      </div>
      : <div className="row justify-content-center">
        <div className="col-lg-1" style={ownerDogStyle}></div>
        <div className="col-lg-3">{`${data.dog_name} is not meeting with anyone...yet!`}
          <br /><br/><strong>Playdate Still Open</strong></div>
        <div className="col-lg-1" style={otherDogStyle}></div>
        <div className="col-lg-2">
          Meeting on {convertDate(data.date)}
        </div>
        <div className="col-lg-2">
          Meeting Location: <br/> {data.display_address}
        </div>
      </div>;
  };

  return (
    <div className="container-fluid mx-5">
      <h4 className="mb-3">My Playdates and Requests</h4>
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
