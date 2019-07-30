import React from 'react';
import requireAuth from '../requireAuth';

class Feature extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <>
        <h1>Feature Page - Protected</h1>
      </>
    );
  }
}




export default requireAuth(Feature) //wrap Feature page in requireAuth page; any page that needs to be protected can be wrapped with requireAuth in this way
