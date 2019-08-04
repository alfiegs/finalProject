import React from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
import {saveStar} from '../actions'


class FeedStars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 1
          };
    }


    componentWillMount(){
        this.setState({
            rating: this.props.rating
        })
    }
    // onStarClick(nextValue, prevValue, name) {
    //     this.setState({rating: nextValue});
    //     this.props.starClick({
    //       rating: this.state.rating
    //     })
    //   }
    

    render() {
        const { rating } = this.state;
        return (
            <div>
        <StarRatingComponent 
          name="rate1" 
          starCount={5}
        //   renderStarIcon={() => <span>⍟</span>} //unicode character here
          value={rating}
        //   onStarClick={this.onStarClick.bind(this)}
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


export default connect(null, mapDispatchToProps)(FeedStars)