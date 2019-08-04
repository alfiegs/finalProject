import React from 'react';
import axios from 'axios';
import FeedStars from './FeedStars';
import {Container, Row, Col} from 'react-bootstrap'


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
                    var date = new Date(x.createdAt);
                    var year = date.getFullYear();
                    var day = date.getDay();
                    var month = date.getMonth();
                    var hour = date.getHours();
                    var minutes = date.getMinutes();
                    if(x.userid === userIdInt){
                    return <>
                    <div class="feed-post">
                    <Row >
                        <Col md={3}>
                            {x.title}
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
    }
}


export default YourFeed
