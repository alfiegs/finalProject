import React from 'react';
import {Field, reduxForm} from 'redux-form';  //field is equivalent to input field
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Row, Col} from 'react-bootstrap';
import {saveVisitor} from '../actions';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        name: "",
        comment: ""
    }
    
  }

handleEmailChange = (e) => {
    this.setState({
        email: e.target.value
    })
}
handleNameChange = (e) => {
    this.setState({
        name: e.target.value
    })
}
handleCommentsChange = (e) => {
    this.setState({
        comment: e.target.value
    })
}

handleSubmit = (e) => {
    e.preventDefault()
    this.props.saveVisitors({
        name: this.state.name,
        email: this.state.email,
        comment: this.state.comment
    })
}



  render() {
    const { handleSubmit } = this.props //handleSubmit is function from redux-forms that takes in a function we create, onSubmit
    return (
      <>
      <Row >
        <Col md={4}></Col>
        <Col>
        <h5>Leave your info and I'll send you my resume and portfolio</h5>
        <form >
            <input
            type="text" 
            placeholder="Your name"
            onChange={this.handleNameChange}
            class="hun-percent"
            />
            <br />
            <br />
            <input
            type="text" 
            placeholder="Your email"
            onChange={this.handleEmailChange}
            class="hun-percent"
            />
            <br />
            <br />
            <textarea
            type="textarea" 
            placeholder="Comments"
            onChange={this.handleCommentsChange}
            class="hun-percent"
            />
            <br />
            <br />
            <button class="sign-in-button" onClick={this.handleSubmit}>Sign</button>
        </form>
        </Col>
        <Col md={4}></Col>
      </Row>
      </>
    );
  }
}


let mapDispatchToProps = (dispatch) =>{
    return {
        saveVisitors: (data) => dispatch(saveVisitor(data))
    }
  }



export default connect(null, mapDispatchToProps)(Contact)


