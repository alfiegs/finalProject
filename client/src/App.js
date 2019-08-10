import React from 'react';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

export default (props) => {
  return (
    <>
    <Header /><br />
      {props.children}
    </>
  )
}
