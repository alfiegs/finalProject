
import { AUTH_USER, AUTH_ERROR } from '../actions/types';


const Initial_State = {
    authenticated: "", //eventually will hold JWT
    errorMessage: ""
}

let auth = (state = Initial_State, action) => {
    switch(action.type){
        case AUTH_USER: 
            return{
                ...state, //copies state (spread operator)
                authenticated: action.payload
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