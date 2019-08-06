import React from 'react';
import {Col, Row} from 'react-bootstrap';
import StarRating from './StarRating';
import {Button} from 'react-bootstrap';
import { saveToDB } from '../actions';
import {connect} from 'react-redux';
import requireAuth from '../requireAuth';




class Other extends React.Component {
    constructor(props) {
        super(props);
        
    }

    handleSave = (title, note, e) => {
        console.log(`handleSave: title ${title}, note ${note}, rating ${this.props.starRating}`);
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
            username: usernameFromLocalStorage,
        })
    }

    render() {
        return (
            <>
            <Row>
                <Col md={3}></Col>
                <Col >
                <div class="movie-form">
                    <h4>What did you do today?</h4>
                    <hr />
                    <form >
                    Activity
                    <br />
                    <input 
                    id="other-title-input"
                    class="other-input"
                    onChange={this.handleQueryChange}
                    placeholder='Saw an opera, tried a recipe, etc.'
                    />
                    <br />
                    <br />
                    Rating
                    <br />
                    <StarRating />
                    <br />
                    Comments
                    <br />
                    <textarea 
                    id="other-note-input"
                    class="other-input"
                    placeholder='What did you think?'
                    />
                    <br />
                    <br />
                    <Button 
                        type="submit" 
                        id="other-save-button"
                        onClick={(e) => this.handleSave(document.getElementById('other-title-input').value, document.getElementById('other-note-input').value, e)}
                        >
                        Save
                    </Button>
                    </form>
                </div>
                </Col>
                <Col md={3}></Col>
            </Row>
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

  export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(Other))
