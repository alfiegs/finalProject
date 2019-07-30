import React from 'react';
import Header from '../src/components/Header';

export default (props) => {
  return (
    <>
    <Header /><br />
      {props.children}
    </>
  )
}
