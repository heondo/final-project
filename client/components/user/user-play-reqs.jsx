import React, { useState, useEffect } from 'react';
import { convertDate } from './../help/functions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
        console.log(Date.now());
        let newArr = res.playdates.concat(res.requests).filter(a => {
          if (a.response_time) {
            if ((Date.now() / 1000) - a.response_time > 172800 || a.accepted === 0) {
              return false;
            }
          }
          return (a.date > Date.now() / 1000 || ((Date.now() / 1000) - a.date < 172800 * 4));
        }).sort((a, b) => (a.date > b.date) ? 1 : -1);
        setPlayReqs(newArr);
      })
      .catch(error => { console.error(error); });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const whichTypeDate = (playOrReq, index) => {
    if ('request_id' in playOrReq) {
      return <div key={index}><Request data={playOrReq} /><hr className="w-75" /></div>;
    } else {
      return <div key={index}><CreatedPlaydate data={playOrReq} /><hr className="w-75" /></div>;
    }
  };

  const Request = props => {
    const { data } = props;
    const ownerDogStyle = {
      backgroundImage: "url('" + data.dog_image + "')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '3px',
      width: '100px',
      height: '100px'
    };

    const otherDogStyle = {
      backgroundImage: "url('" + data.other_dog_url + "')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '3px',
      width: '100px',
      height: '100px',
      cursor: 'pointer'
    };

    if (data.accepted === null) {
      return (
        <div className="row justify-content-center">
          <div className="col-lg-1 col-2" style={ownerDogStyle}></div>
          <div className="col-lg-3 col-6">
            <p>{`${data.other_dog_name} has not responded to meet with ${data.dog_name}`}
              <br /><br /><div className="open-request badge">Request Pending</div></p>
          </div>
          <div className="col-lg-1 col-2" style={otherDogStyle} onClick={() => {
            history.push(`/dog/${data.other_dog_id}`);
          }}></div>
          <div className="w-100 d-block d-md-none"></div>
          <div className="col-lg-2 col-6">
            Meeting Date: <br /> {convertDate(data.date)}
          </div>
          <div className="col-lg-2 col-6">
            Meeting Location: <br /> {data.display_address}
          </div>
        </div>
      );
    } else if (data.accepted === 0) {
      return (
        <div className="row justify-content-center">
          <div className="col-lg-1 col-2" style={ownerDogStyle} ></div>
          <div className="col-lg-3 col-6">
            <p>{`${data.other_dog_name} does not wish to meet with ${data.dog_name} :(`}
              {
                ((Date.now() / 1000) - data.response_time < 172800) ? <div>Recently Denied</div> : <br />
              }
              <br /><div className="denied-request badge">Request Denied</div></p>
          </div>
          <div className="col-lg-1 col-2" style={otherDogStyle} onClick={() => {
            history.push(`/dog/${data.other_dog_id}`);
          }}></div>
          <div className="w-100 d-block d-md-none"></div>
          <div className="col-lg-2 col-6">
            Meeting Date: <br /> {convertDate(data.date)}
          </div>
          <div className="col-lg-2 col-6">
            Meeting Location: <br /> {data.display_address}
          </div>
        </div>
      );
    } else if (data.accepted === 1) {
      return (
        <div className="row justify-content-center">
          <div className="col-lg-1 col-2" style={ownerDogStyle}></div>
          <div className="col-lg-3 col-6">
            <p>{`${data.other_dog_name} has agreed to meet with ${data.dog_name}!`}
              {
                ((Date.now() / 1000) - data.response_time < 172800) ? <div>Recently Confirmed!</div> : <br />
              }
              <br/><div className="success-request badge">Request Accepted</div></p>
          </div>
          <div className="col-lg-1 col-2" style={otherDogStyle} onClick={() => {
            history.push(`/dog/${data.other_dog_id}`);
          }}></div>
          <div className="w-100 d-block d-md-none"></div>
          <div className="col-lg-2 col-6">
            Meeting Date: <br /> {convertDate(data.date)}
          </div>
          <div className="col-lg-2 col-6">
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
      borderRadius: '3px',
      width: '100px',
      height: '100px'
    };

    let reqDogImage = (data.req_dog_url) ? data.req_dog_url : './../assets/images/unknown-dog.png';
    const otherDogStyle = {
      backgroundImage: "url('" + reqDogImage + "')",
      backgroundSize: (data.req_dog_url) ? 'cover' : 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '3px',
      width: '100px',
      height: '100px',
      cursor: (data.req_dog_url) ? 'pointer' : 'default'
    };

    return (data.confirmed)
      ? <div className="row justify-content-center">
        <div className="col-lg-1 col-2" style={ownerDogStyle}></div>
        <div className="col-lg-3 col-6">
          <div>{`${data.dog_name} is meeting with ${data.req_dog_name}`}
            {
              ((Date.now() / 1000) - data.accepted_date < 172800) ? <div>Recently Confirmed!</div> : <br />
            }
            <br /><div className="success-playdate badge">Playdate Confirmed</div></div>
        </div>
        <div className="col-lg-1 col-2" style={otherDogStyle} onClick={() => {
          history.push(`/dog/${data.req_dog_id}`);
        }}></div>
        <div className="w-100 d-block d-md-none"></div>
        <div className="col-lg-2 col-6">
          Meeting Date: <br /> {convertDate(data.date)}
        </div>
        <div className="col-lg-2 col-6">
          Meeting Location: <br /> {data.display_address}
        </div>
      </div>
      : <div className="row justify-content-center">
        <div className="col-lg-1 col-2" style={ownerDogStyle}></div>
        <div className="col-lg-3 col-6">{`${data.dog_name} is not meeting with anyone... yet!`}
          <br /><br /><div className="open-playdate badge">Playdate Still Open</div></div>
        <div className="col-lg-1 col-2" style={otherDogStyle}></div>
        <div className="w-100 d-block d-md-none"></div>
        <div className="col-lg-2 col-6">
          Meeting Date: <br /> {convertDate(data.date)}
        </div>
        <div className="col-lg-2 col-6">
          Meeting Location: <br /> {data.display_address}
        </div>
      </div>;
  };

  return (
    <div className="container-fluid text-center dog-total-info">
      <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        transitionName={props.match.path === '/my-playdates/:id' ? 'SlideIn' : 'SlideOut'}
      >
        <hr />
        <h4 className="mb-4 mx-auto">My Playdates and Requests</h4>
        <div className="d-flex flex-column">
          {
            (playReqs) ? playReqs.map((pr, index) => {
              return whichTypeDate(pr, index);
            }) : <h5>No upcoming playdates or requests</h5>
          }
        </div>
      </ReactCSSTransitionGroup>
    </div>
  );
}
