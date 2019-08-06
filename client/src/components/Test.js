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
        return (
            <>
            <Container fluid={true}>
                {activitiesList.map((x)=> {
                    let year = x.createdAt.slice(0,4);
                    let month = x.createdAt.slice(5,7);
                    let day = x.createdAt.slice(8,10);
                    let time = x.createdAt.slice(11,16);
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
                            <span class="feed-post-date">Posted on {month}-{day}-{year}</span>
                            <span class="feed-post-date"> at {time}</span>
                        </Col>
                    </Row>
                    </div>
                    </>
                    }
                })}
                </Container>

            </>
        );
    }
}


export default requireAuth(connect(null, null)(YourFeed))
