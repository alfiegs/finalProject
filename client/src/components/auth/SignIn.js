import React from 'react';
import {Field, reduxForm} from 'redux-form';  //field is equivalent to input field
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {compose} from 'redux'

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    
  }



  onSubmit = (formProps) => { //everything inside our form
    console.log(formProps)
    this.props.signin(formProps, ()=>{//signup from actions index, kicks off action function
      this.props.history.push('/feature') //part of react-router-dom; when our user has authenticated, we direct them to protected page
    }) 
  }

  render() {
    const { handleSubmit } = this.props //handleSubmit is function from redux-forms that takes in a function we create, onSubmit
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <br />
        <fieldset> 
        <label>Email</label>
        <Field 
          name="email"
          type="text"
          component="input"
          autoComplete="none"
        />
        </fieldset>

        <fieldset>
          <label>Password</label>
          <Field 
          name="password"
          type="password"
          component="input"
          autoComplete="none"
        />
        </fieldset>
        <div>{this.props.errorMessage}</div>
        <button>Sign In</button>
      </form>
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
