import React from 'react';
import {connect} from 'react-redux';
import { saveToDB } from '../actions';
import axios from 'axios';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: []
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
    axios.get('/api')
    .then((data)=>{
      console.log(data.data.data)
      this.setState({
        activities: data.data.data
      })
    })
  }


  render() {
    let activitiesList = this.state.activities.reverse()
    console.log(this.state.activities)
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
        return <p>{x.title} - {x.note} - {x.rating}</p>
      })}
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