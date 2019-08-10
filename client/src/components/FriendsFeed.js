import React from 'react';
import {connect} from 'react-redux';
import { saveToDB } from '../actions';
import axios from 'axios';
import {Container, Row, Col, Button} from 'react-bootstrap';
import FeedStars from './FeedStars';
import requireAuth from '../requireAuth';



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
    // console.log(title, note, rating)
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
        activities: data.data.data.reverse()
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
    let friendsList = []
    let test = parseInt(this.state.userid)
    this.state.friends.forEach((entry)=>{
      if(entry.userid === test)
      friendsList.push(entry.friendid)
    })
    // console.log(test)
    // console.log(friendsList)
    let activitiesList = this.state.activities;
    if(friendsList.length){
    return (
      <>
        <Container fluid={true}>
            {activitiesList.map((x)=> {
                var date = new Date(x.createdAt);
                var year = date.getFullYear();
                var day = date.getDay();
                var month = date.getMonth();
                var hour = date.getHours();
                var minutes = date.getMinutes();
                if(friendsList.includes(x.userid)){
                return <>
                <div class="feed-post">
                <Row >
                    <Col md={2}>
                    <div class="feed-post-overflow">
                        {x.username}
                    </div>
                    </Col>
                    <Col md={3}>
                    <div class="feed-post-overflow">
                        {x.title}
                    </div>
                    </Col>
                    <Col md={2}>
                        <FeedStars rating={x.rating}/>  
                    </Col>
                    <Col>
                        <div class="feed-post-overflow">
                        {x.note}
                        </div>
                    </Col>
                    <Col md={2}>
                        
                        <span class="feed-post-date">Posted on </span>
                        <span class="feed-post-date">{month}-{day}-{year} at {hour}:{minutes}</span>
                    </Col>
                </Row>
                </div>
                </>
                }
            })}
            </Container>
      </>
    );
    }else{
      return <>
                  <Row>
                <Col md={4}></Col>
                <Col>
                
            <p class="center-text">Add some friends to see what they're up to. </p>
            <p class="center-text"><a href="/users"><Button id="add-friends-button">Friends</Button></a></p>
                </Col>
                <Col md={4}></Col>
            </Row>
      </>
    }
  }
}

let mapDispatchToProps = (dispatch) =>{
  return {
      saveData: (data) => dispatch(saveToDB(data))
  }
}



export default requireAuth(connect(null, mapDispatchToProps)(Test))
