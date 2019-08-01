import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { saveFriendToDB } from '../actions';




class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
        
    }

    componentWillMount(){
        axios.get('/users')
        .then((data)=>{
          console.log(data.data.data)
          this.setState({
            users: data.data.data
          })
        })
      }

    handleSaveUser = (email, id, e) => {
        e.preventDefault();
        console.log(`friend info: email - ${email}, id - ${id}`)
        let idFromLocalStorage = localStorage.getItem("id")
        this.props.saveFriend({
            friendemail: email,
            friendid: id,
            userid: idFromLocalStorage
        })
        // alert(`You started following ${email}`)
    }

    render() {
        return (
            <>
            <h1>Users</h1>
            <ul>
            {this.state.users.map((user)=>{
                return <li onClick={(e) => this.handleSaveUser(user.email, user.id, e)}>{user.email}{`, id: ${user.id}`}</li>
            })}
            </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(Users)