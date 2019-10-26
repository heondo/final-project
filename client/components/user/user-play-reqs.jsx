import React, { useState, useEffect } from 'react';

export default function UserPlaydates(props) {
  const [playReqs, setPlayReqs] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch(`/api/user-play-reqs/${props.userID}`, { signal })
      .then(res => res.json())
      .then(res => console.log(res));

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div className="container-fluid">
      <h4>My Playdates and Requests</h4>
      <div className="">Something else here</div>
    </div>
  );
}
