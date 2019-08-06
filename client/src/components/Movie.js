import React from 'react';
import '../App.css';
import StarRating from './StarRating';
import { saveToDB } from '../actions';
import {connect} from 'react-redux';
import {Container, Row, Col} from 'react-bootstrap';
import requireAuth from '../requireAuth';






class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            movies: []
        }
        
    }

movieClick = (e) => {
    // e.preventDefault();
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
}}



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

    handleSubmit = (e) =>{
        e.preventDefault();
        let movieQuery = this.state.query;
        let searchURL = `https://api.themoviedb.org/3/search/movie?api_key=559a0b316b5f920e0a1c53116fa14b54&language=en-US&query=${movieQuery}&page=1&include_adult=false`
        fetch(searchURL)
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            // console.log(data)
            this.setState({
                movies: data.results,
            }) 
        })
    }

    handleSave = (note, title, modalId, e) => {
        console.log(`handleSave: title ${title}, note ${note}, rating ${this.props.starRating}`);
        var modal = document.getElementById(modalId);
        e.preventDefault();
        let idFromLocalStorage = localStorage.getItem("id")
        let usernameFromLocalStorage = localStorage.getItem("username")
        console.log(idFromLocalStorage)
        console.log(usernameFromLocalStorage)
        this.props.saveData({
            title: title,
            note: note,
            rating: this.props.starRating,
            userid: idFromLocalStorage,
            username: usernameFromLocalStorage
        })
        modal.style.display = "none";
    }



render() {
    // console.log(this.state.query);
    // console.log(this.state.movies);
    let imgURLBase = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/"
    return (
        <>
        <Row>
            <Col md={1}></Col>
            <Col>
            <div class="movie-form">
                <h4>What movie did you watch today?</h4>
                <form onSubmit={this.handleSubmit}>
                <input 
                class="movie-input"
                onChange={this.handleQueryChange}
                placeholder='Type Movie Here'

                />
                <button type="submit">Search</button>
                </form>
            </div>
            </Col>
        </Row>
        <Row>
        <Col md={1}></Col>
        <Col xs={10}>
                <br />
                {/* {this.state.query}
                {this.props.starRating} */}
                <br />
                {this.state.movies.map((movie, i)=>{
                    let year = movie.release_date.slice(0, 4)
                    let buttonId = "myBtn" + i;
                    let modalId = "modal" + i
                    return <>
                    <Row>
                    <Col>
                    <div class="movie-bubble">
                        <div class="movie-image-div"><img src={imgURLBase+movie.poster_path}></img></div>
                        <div class="movie-info-div">
                        <h5>{movie.title} ({year})</h5>
                        <br />
                        <div class="movie-overview">
                        {movie.overview}
                        </div>
                        <br />
                        <button id={buttonId} class="diditbutton" key={"save"+i} onClick={(e) => this.didIt(buttonId, modalId, e)}>Did It</button>
                        </div>
                    </div>
                    </Col>
                    </Row>
                        {/* MODAL */}
                        <div id={modalId} class="modal">

                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <span>{movie.title} ({year})</span>
                            <StarRating />
                            <hr />
                            <span>What did you think?</span>
                            <br />
                            <textarea id="input-notes" />
                            <br />
                            <button onClick={(e) => this.handleSave(document.getElementById('input-notes').value, movie.title, modalId, e)}>Save</button>
                        </div>


</div>
                    </>
                })}
                <br />
                </Col>
                <Col md={1}></Col>
                </Row>


                {/* <button class="accordion">Section 1</button>
                <div class="panel">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>

                <button class="accordion">Section 2</button>
                <div class="panel">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>

                <button class="accordion">Section 3</button>
                <div class="panel">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div> */}






        
        </>

    );
}
}



let mapDispatchToProps = (dispatch) =>{
    return {
        saveData: (data) => dispatch(saveToDB(data))
    }
  }

  let mapStateToProps = (state) => {
    return{
      starRating: state.main.starRating,
      userId: state.auth.userId
    }
  }

// export default connect(mapStateToProps, mapDispatchToProps)(Start)
export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(Start))
// export default requireAuth(Feature)