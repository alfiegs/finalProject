import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import StarRating from './StarRating';

export default () => {
  return (
    <>
    <Row>
      <Col md={1}></Col>
      <Col>
      <div class="welcome-bubble">
        <b>What I Did Today</b> is an app that helps you track all the things you do and see what your
        friends are up to. Whether you watch a <a href="/movie">movie</a>, read a <a href="/book">book</a>,
        go to a <a href="/place">place</a> you've never been to, or <a href="/other">anything</a> else, What I Did Today lets you log it to your feed so you can go back and remember
        all of the things you've been up to. 
      </div>
      </Col>
      <Col md={4}>
        <a href="/contact"><button id="contact-alfie">Get my resume!</button></a>
      </Col>
    </Row>

    <Row>
    <Col md={4}></Col>
      <Col>
      <div class="welcome-bubble">
        For every activity you log, you can rank it out of 5 stars and write a brief note about it. Then post it to <a href="/yourfeed">your feed</a>.
        <span id="center-stars"><StarRating /></span>
        What did you like about it? What did you hate? What do you want to remember when you look back at your feed? 
        What do you want your friends to know?
      </div>
      </Col>
      <Col md={1}></Col>
    </Row>
 
    <Row>
      <Col md={1}></Col>
      <Col>
      <div class="welcome-bubble">
        <b>What I Did Today</b> helps you keep up to date with what your friends are doing and what they like and don't like.
        Be sure to <a href="/users">add some friends</a> so that you can see their activities pop up on your <a href="/yourfeed">Friends Feed</a>.
      </div>
      </Col>
      <Col md={2}></Col>
    </Row>
    </>
  )
}
