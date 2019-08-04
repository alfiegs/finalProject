import React from 'react';
import {connect} from 'react-redux';
import { saveToDB } from '../actions';
import axios from 'axios';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      friends: [],
      userid: 0
    }
    
  }

  handleSave = (title, note, rating, e) => {
    e.preventDefault();
    console.log(title, note, rating)
    this.props.saveData({
      title: title,
      note: note,
      rating: rating
    })
  }

  componentWillMount(){
    let userid = localStorage.getItem("id")
    axios.get('/api')
    .then((data)=>{
      console.log(data.data.data)
      this.setState({
        activities: data.data.data
      })
    })
    axios.get('/friendsTable')
    .then((data)=>{
      console.log(data.data.data)
      this.setState({
        friends: data.data.data,
        userid: userid
      })
    })
  }


  render() {
    let activitiesList = this.state.activities.reverse()
    console.log(this.state.activities)
    let friendsList = []
    let test = parseInt(this.state.userid)
    this.state.friends.forEach((entry)=>{
      if(entry.userid === test)
      friendsList.push(entry.friendid)
    })
    console.log(test)
    console.log(friendsList)
    return (
      <>
      <form onSubmit={(e) => this.handleSave(document.getElementById('title').value, document.getElementById('note').value, document.getElementById('rating').value, e)}>
        <label>Title</label>
        <input 
          type="text"
          id="title"
        />
        <label>Note</label>
        <input 
          type="text"
          id="note"
        />
        <label>Rating</label>
        <input 
          type="text"
          id="rating"
        />
        <button type="submit">Save</button>
      </form>

      <br />
      
      {activitiesList.map((x)=> {
        // var date = new Date(x.createdAt);
        // var year = date.getFullYear
        if(friendsList.includes(x.userid)){
        return <p>{x.userid} - {x.username} - {x.title} - {x.note} - {x.rating} - {x.createdAt}</p>
        }
      })}
      <br />
      {/* {this.state.friends.map((y)=> {
        return <p>{y.friend}, {y.friendid}</p>
      })} */}
      </>
    );
  }
}

let mapDispatchToProps = (dispatch) =>{
  return {
      saveData: (data) => dispatch(saveToDB(data))
  }
}



export default connect(null, mapDispatchToProps)(Test)