import React from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
import {saveStar} from '../actions'


class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 1
          };
    }


    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
        this.props.starClick({
          rating: nextValue
        })
      }
    

    render() {
        const { rating } = this.state;
        return (
            <div>
        <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
        );
    }
}

let mapDispatchToProps = (dispatch) =>{
  return {
      starClick: (data) => dispatch(saveStar(data))
  }
}


export default connect(null, mapDispatchToProps)(Test)