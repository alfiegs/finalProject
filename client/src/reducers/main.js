import { SAVE_STAR } from '../actions/types';


const Initial_State = {
    starRating: 0
}

let main = (state = Initial_State, action) => {
    console.log(`starRating in Reducer: ${state.starRating}`)
    switch(action.type){
        case SAVE_STAR:
            return{
                ...state,
                starRating: action.starRating
            }
            default:
                return state;
    }
}

export default main