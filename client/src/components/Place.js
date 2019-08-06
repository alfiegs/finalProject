import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import StarRating from './StarRating';
import { saveToDB } from '../actions';
import {connect} from 'react-redux';
import requireAuth from '../requireAuth';


class Place extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            places: [],
            note: "",
            query: ""
        }
        
    }

    // componentWillMount(){
    //     let apiurl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyD3go5v5PSAXk4Ni28gk8EVpUnL14iNgdQ`;
    //     fetch("https://cors-anywhere.herokuapp.com/" + apiurl)
    //         .then((response)=>{
    //             return response.json()
    //         })
    //         .then((data)=>{
    //             console.log(data.candidates)
    //             this.setState({
    //                 places: data.candidates,
    //             }) 
    //         })
    // }



    handleSearch = (e) => {
        e.preventDefault();
        let placeQuery = this.state.query
        let apiurl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${placeQuery}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyD3go5v5PSAXk4Ni28gk8EVpUnL14iNgdQ`;
        fetch("https://cors-anywhere.herokuapp.com/" + apiurl)
            .then((response)=>{
                return response.json()
            })
            .then((data)=>{
                console.log(data.candidates)
                this.setState({
                    places: data.candidates,
                }) 
            })
    }



    didIt = (buttonId, modalId, e) => {
        e.preventDefault();
        // Get the modal
    var modal = document.getElementById(modalId);
    
    // Get the button that opens the modal
    var btn = document.getElementById(buttonId);
    
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    
    // When the user clicks on the button, open the modal 
      modal.style.display = "block";
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    }


    handleQueryChange = (e) => {
        this.setState({
            query: e.target.value
        })
    }

    handleNoteChange = (e) => {
        this.setState({
            note: e.target.value
        })
    }


    handleSave = (title, modalId, e) => {
        console.log(`handleSave: title ${title}, rating ${this.props.starRating}`);
        var modal = document.getElementById(modalId);
        e.preventDefault();
        let idFromLocalStorage = localStorage.getItem("id")
        let usernameFromLocalStorage = localStorage.getItem("username")
        console.log(idFromLocalStorage)
        console.log(usernameFromLocalStorage)
        this.props.saveData({
            title: title,
            note: this.state.note,
            rating: this.props.starRating,
            userid: idFromLocalStorage,
            username: usernameFromLocalStorage
        })
        modal.style.display = "none";
    }


    render() {
        // console.log(this.state.books)
        return (
            <>
            {/* {this.state.places.map((place)=>{
                return <p>{place.name} - {place.formatted_address}</p>
            })} */}
                <Row>
                <Col md={2}></Col>
                <Col>
                <form onSubmit={this.handleSearch}>
                <h4>Where did you go today?</h4>
                <input 
                id="place-search" 
                placeholder="Type Place Here"
                onChange={this.handleQueryChange}
                ></input>
                <button type="submit">Search</button>
                <br />
                <br />
                </form>
                </Col>
                <Col md={2}></Col>
                </Row>
                {this.state.places.map((place, i)=>{
                    // let imgsrc = book.volumeInfo.imageLinks.thumbnail;
                    let buttonId = "myBtn" + i;
                    let modalId = "modal" + i
                    return <>
                    <Row class="place-display" style={{ margin: '50px' }}>
                        <Col md={2}></Col>
                        <Col>
                    <div class="book-bubble">
                    <b>{place.name}</b>
                    <br />
                    {place.formatted_address}
                    <br />
                    <button id={buttonId} class="diditbutton" key={"save"+i} onClick={(e) => this.didIt(buttonId, modalId, e)}>Did It</button>
                    </div>
                        </Col>
                        <Col md={2}></Col>
                    </Row>
                        <div id={modalId} class="modal">
                            <div class="modal-content">
                                <span class="close">&times;</span>
                                <span>{place.name}</span>
                                <StarRating />
                                <hr />
                                <span>What did you think?</span>
                                <br />
                                <textarea id="input-notes" 
                                onChange={this.handleNoteChange}
                                />
                                <br />
                                <button onClick={(e) => this.handleSave(place.name, modalId, e)}>Save</button>
                            </div>
                        </div>
                    </>
                    
                })}
            </>
        );
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        saveData: (data) => dispatch(saveToDB(data))
    }
}

let mapStateToProps = (state) => {
    return {
        starRating: state.main.starRating,
        userId: state.auth.userId
    }
}


export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(Place))
