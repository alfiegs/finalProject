import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { saveFriendToDB } from '../actions';
import {Col, Row} from 'react-bootstrap';
import requireAuth from '../requireAuth';





class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            error: ""
        }
        
    }

    componentWillMount(){
        axios.get('/users')
        .then((data)=>{
          console.log(data.data.data)
          this.setState({
            users: data.data.data,
          })
        })
      }

    handleSaveUser = (email, id, e) => {
        e.preventDefault();
        console.log(`friend info: email - ${email}, id - ${id}`)
        let idFromLocalStorage = parseInt(localStorage.getItem("id"));
        console.log(idFromLocalStorage)
        console.log(id)
        if(idFromLocalStorage === id){
          alert(`You can't friend yourself`)
        }else{
          alert(`You started following ${email}`)
        this.props.saveFriend({
            friendemail: email,
            friendid: id,
            userid: idFromLocalStorage
        })
      }
    }

    render() {
        return (
            <>
            <Row>
            <Col md={2}></Col>
            <Col>
            <h1>Potential Friends</h1>
            <p>{this.state.error}</p>
            {this.state.users.map((user)=>{
                return <>
                <div class="user-bubble">
                <b>{user.email}</b>
                <hr />
                <p>About {user.email}:</p>
                {user.bio}
                <br />
                <br />
                <button class="user-add-button" onClick={(e) => this.handleSaveUser(user.email, user.id, e)}>Add Friend</button>
                </div>
                </>
            })}
            </Col>
            <Col md={2}></Col>
            </Row>
            </>
        );
    }
}


let mapStateToProps = (state) => {
    return{
      userId: state.auth.userId
    }
  }

let mapDispatchToProps = (dispatch) =>{
    return {
        saveFriend: (data) => dispatch(saveFriendToDB(data))
    }
  }

  export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(Users))
