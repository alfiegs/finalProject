import React from 'react';
import axios from 'axios';
import {Row,Col,Button} from 'react-bootstrap';
import requireAuth from '../requireAuth';
import {connect} from 'react-redux';


class FriendList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            userid: 0
        }
        
    }

    componentWillMount(){
        let userid = localStorage.getItem("id")

        axios.get('/friendsTable')
            .then((data) => {
                console.log(data.data.data)
                this.setState({
                    friends: data.data.data,
                    userid: userid
                })
            })
    }

    render() {
        let userid = parseInt(this.state.userid)
        return (
            <>
            <Row>
            <Col md={3}></Col>
            <Col>
            <h4>Your Friends</h4>
            <br />
            {this.state.friends.map((entry)=>{
                if(entry.userid === userid){
                return <>
                <div class="friend-bubble">
                {entry.friend} {entry.email}
                </div>
                </>
                }
            })}
            </Col>
            <Col md={1}></Col>
            <Col md={2}>
                <Button href="/users" id="view-all-users">View All Users</Button>
            </Col>
            </Row>
            </>
        );
    }
}




export default requireAuth(connect(null, null)(FriendList))
