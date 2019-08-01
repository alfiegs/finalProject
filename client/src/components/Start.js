import React from 'react';
import '../App.css';
import StarRating from './StarRating';
import { saveToDB } from '../actions';
import {connect} from 'react-redux';




class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            movies: []
        }
        
    }

movieClick = (e) => {
    e.preventDefault();
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
btn.onclick = function() {
  modal.style.display = "block";
}

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
            console.log(data)
            this.setState({
                movies: data.results,
            }) 
        })
    }

    handleSave = (note, title, e) => {
        console.log(`handleSave: title ${title}, note ${note}, rating ${this.props.starRating}`);
        e.preventDefault();
        let idFromLocalStorage = localStorage.getItem("id")
        console.log(idFromLocalStorage)
        this.props.saveData({
            title: title,
            note: note,
            rating: this.props.starRating,
            userid: idFromLocalStorage
        })
    }


    render() {
        console.log(this.state.query);
        console.log(this.state.movies);
        return (
            <>
                    {/* <form onSubmit={this.handleSubmit}>
                    <input 
                    onChange={this.handleQueryChange}
                    />
                    <button type="submit">submit</button>
                    </form>
                    <br />
                    {this.state.query}
                    <br />
                    <ul>
                    {this.state.movies.map((movie, i)=>{
                        return <li key={i}>{movie.title}</li>
                    })}
                    </ul>
                    <br /> */}



                    <form onSubmit={this.handleSubmit}>
                    <input 
                    onChange={this.handleQueryChange}
                    />
                    <button type="submit">submit</button>
                    </form>
                    <br />
                    {this.state.query}
                    {this.props.starRating}
                    <br />
                    {this.state.movies.map((movie, i)=>{
                        let year = movie.release_date.slice(0, 4)
                        let buttonId = "myBtn" + i;
                        let modalId = "modal" + i
                        return <>
                        <button key={"expand"+i} onClick={this.movieClick} className="accordion">{movie.title} ({year})</button>
                        <div key={"infodiv"+i} className="panel">
                        <span key={"info"+i}>{movie.overview}</span>
                        <button id={buttonId} class="diditbutton" key={"save"+i} onClick={(e) => this.didIt(buttonId, modalId, e)}>Did It</button>
                        </div>
                            <div id={modalId} class="modal">

                            <div class="modal-content">
                                <span class="close">&times;</span>
                                <span>{movie.title} ({year})</span>
                                <StarRating />
                                <hr />
                                <span>What did you think?</span>
                                <br />
                                <input id="input-notes" /> 
                                <br />
                                <button onClick={(e) => this.handleSave(document.getElementById('input-notes').value, movie.title, e)}>Save</button>
                            </div>


</div>
                        </>
                    })}
                    <br />



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

export default connect(mapStateToProps, mapDispatchToProps)(Start)