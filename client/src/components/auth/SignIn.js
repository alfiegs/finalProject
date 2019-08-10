import React from 'react';
import {Field, reduxForm} from 'redux-form';  //field is equivalent to input field
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {compose} from 'redux';
import {Row, Col} from 'react-bootstrap';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    
  }



  onSubmit = (formProps) => { //everything inside our form
    console.log(formProps)
    this.props.signin(formProps, ()=>{//signup from actions index, kicks off action function
      this.props.history.push('/yourfeed') //part of react-router-dom; when our user has authenticated, we direct them to protected page
    }) 
  }

  render() {
    const { handleSubmit } = this.props //handleSubmit is function from redux-forms that takes in a function we create, onSubmit
    return (
      <>
      <Row >
        <Col md={4}></Col>
        <Col md={4}>
        <h4>Please Sign In</h4>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <br />
            <fieldset> 
            <label>Username: </label>
            <br />
            <Field 
              name="email"
              type="text"
              component="input"
              autoComplete="none"
              class="sign-in-input"
              placeholder="username"
            />
            </fieldset>

            <fieldset>
              <label>Password: </label>
              <br />
              <Field 
              name="password"
              type="password"
              component="input"
              autoComplete="none"
              class="sign-in-input"
              placeholder="password"
            />
            </fieldset>
            <div>{this.props.errorMessage}</div>
            <br />
            <button class="sign-in-button">Sign In</button>
            <br />
            <br />
          </form>
          <a href="/signup"><button class="sign-in-button">Or Sign Up</button></a>
        </Col>
        <Col md={4}></Col>
      </Row>
      </>
    );
  }
}

let mapStateToProps = (state) => { //accesses error message from state so that we can display it above
  return{
    errorMessage: state.auth.errorMessage
  }
}



export default compose( 
  connect(mapStateToProps, actions),  //actions like mapDispatchToProps
  reduxForm({form:'signin'})
)(SignIn)
