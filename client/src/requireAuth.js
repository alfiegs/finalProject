import React, { Component } from 'react';
import { connect } from 'react-redux';


//wrap requireAuth around any component we want to protect


//checks to see if user is authenticated, if so they can see protected componet, if not it redirects

//higher order component that returns a component
export default ChildComponent => { //Child = SignUp
    class ComposedComponent extends Component {

        componentDidMount(){
            this.shouldNavegateAway() //as soon as component gets rendered, it checks to see if authentication is in global state
        }

        //our component just got updated, do above test again in this section of the lifecycle
        componentDidUpdate(){
            this.shouldNavegateAway()
        }

        shouldNavegateAway = () => {
            if(!this.props.auth){ //checks if anything in auth in state
                this.props.history.push('/signin') //if nothing is there, navegate to home page
            }
        }
        

        render() {
            return <ChildComponent {...this.props} />; //you get out the same component sent into the higher order function except with 
        }
        }

        let mapStateToProps = (state) => {
            return{
                auth: state.auth.authenticated
            }
        }

        return connect(mapStateToProps)(ComposedComponent)
}


