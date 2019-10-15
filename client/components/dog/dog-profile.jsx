import React from 'react';

export default class DogProfile extends React.Component {

  render() {
    const genericPic = 'http://www.leighdogsandcatshome.co.uk/wp-content/uploads/2016/10/dog-outline.jpg';

    return (
      <div>{this.props.dog}</div>
    );
  }
}
