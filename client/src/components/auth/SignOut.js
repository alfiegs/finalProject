import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {Row, Col} from 'react-bootstrap';



class SignOut extends React.Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount(){
    this.props.signout();
  }

  render() {
    return (
      <>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          You've successfully signed out. See you again soon!
          <br/>
          <br />
            <p>وداعا!
              مع السلامة!</p>
            <p>再见了！</p>
            <p>Au revoir!</p>
            <p>Auf Wiedersehen!</p>
            <p>Αντίο σας!</p>
            <p>अलविदा!</p>
            <p>さよなら</p>
            <p>안녕!</p>
            <p>خدا حافظ!</p>
            <p>До свидания!</p>
            <p>Hwyl fawr!</p>

        </Col>
        <Col md={3}></Col>
      </Row>
      </>
    );
  }
}






export default connect(null, actions)(SignOut) //mapping actions to this file, shortcut for mapDispatchToProps


//trigger an action to update Redux store
