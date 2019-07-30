import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';



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
      Sorry to see you go :(
      </>
    );
  }
}






export default connect(null, actions)(SignOut) //mapping actions to this file, shortcut for mapDispatchToProps


//trigger an action to update Redux store
