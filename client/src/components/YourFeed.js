import React from 'react';
import axios from 'axios';
import FeedStars from './FeedStars';
import {Container, Row, Col} from 'react-bootstrap';
import requireAuth from '../requireAuth';
import {connect} from 'react-redux';
import Tooltip from './Tooltip';




class YourFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: [],
            userid: 0
        }
        
    }

    componentWillMount(){
        let userid = localStorage.getItem("id")
        axios.get('/api')
        .then((data)=>{
        //   console.log(data.data.data)
          this.setState({
            activities: data.data.data,
            userid: userid
          })
        })
      }

    render() {
        let activitiesList = this.state.activities.reverse()
        // console.log(`userid: ${this.state.userid}`)
        let userIdInt = parseInt(this.state.userid)
        if(activitiesList.length != 0){
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
                        if(x.userid === userIdInt){
                        return <>
                        <div class="feed-post">
                        <hr />
                        <Row >
                            <Col md={3}>
                            <div class="feed-post-overflow">
                                {x.title}
                            </div>
                            </Col>
                            <Col md={2}>
                                <FeedStars rating={x.rating}/>  
                            </Col>
                            <Col >
                                <div class="feed-post-overflow ">
                                {x.note}
                                </div>
                                {/* <Tooltip note={x.note}/> */}
                            </Col>
                            <Col md={2}>
                                {/* <p class="feed-post-date">{x.createdAt}</p> */}
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
            return<>
            <Row>
                <Col md={4}></Col>
                <Col>
                
            <p class="center-text">Your activity log is empty.</p>
            <p class="center-text">Add a <a href="/movie">movie</a>, <a href="/book">book</a>, <a href="/place">place</a>, or <a href="/other">anything else</a>.</p>
                </Col>
                <Col md={4}></Col>
            </Row>
            </>
        }
    }
}


export default requireAuth(connect(null, null)(YourFeed))
