import React, { useState } from 'react';
import { Button } from 'reactstrap';

export default function App(props) {
  const [data, setData] = useState([]);

  function handleDataCall() {
    console.log(this);
    props.r.getHot().map(post => post.title).then(console.log);
  }

  return (
    <div className="container">
      <div>Main container for the app right?</div>
      <Button
        onClick={handleDataCall}>Something</Button>
    </div>
  );
}
