import React from 'react';
import {Link} from 'react-router-dom';

export default () => {
  return (
    <>
      <Link to="/">Home</Link> ||
      <Link to="/signup">Sign Up</Link> ||
      <Link to="/signin">Sign In</Link> || 
      <Link to="/signout">Sign Out</Link> ||
      <Link to="/feature">Feature</Link> ||
      <Link to="/page2">Page 2</Link> ||
      <Link to="/start">Start</Link> ||
      <Link to="/test">Test</Link> ||
    </>
  )
}
