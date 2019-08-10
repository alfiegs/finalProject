
import { AUTH_USER, AUTH_ERROR } from '../actions/types';


const Initial_State = {
    authenticated: "", //eventually will hold JWT
    errorMessage: "",
    userId: 0
}

let auth = (state = Initial_State, action) => {
    // console.log(state.userId)
    switch(action.type){
        case AUTH_USER: 
            return{
                ...state, //copies state (spread operator)
                authenticated: action.payload,
                userId: action.id
            }
        case AUTH_ERROR:
            return{
                ...state,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export default auth