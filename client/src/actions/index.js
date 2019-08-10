import {AUTH_USER, AUTH_ERROR, SAVE_STAR, SEND_ID} from './types';
import axios from 'axios'; //like fetch, except without intermediate function to convert data to JSON



// export const signup = ({email, password}) => {
//     return(dispatch => {
//     }
//     )};
// above full function refactored into one line below
// export const signup = ({email, password}) => dispatch=>{} //return statement not necessary if you only return one thing


//async await - like promise

export const signup = (formProps, callback) => async dispatch => {
    try{ //if code in here fails, send error
    let response = await axios.post('/signup', formProps) //posting this data to signup route, should receive JWT. using async await, awaiting response before executing next code
    console.log(response)
    //dispatch 
    dispatch({type: AUTH_USER, payload: response.data.token, id: response.data.id})
    localStorage.setItem('token', response.data.token) //storing JWT inside local storage (cookies)
    localStorage.setItem('id', response.data.id) 
    localStorage.setItem('username', response.data.username)
    callback(); 
    }
    catch(e){//
        dispatch({type: AUTH_ERROR, payload: "Email already in use."}) //error to send
    }
}


export const signin = (formProps, callback) => async dispatch => {
    try{
        let response = await axios.post('/signin', formProps);
        // console.log(response.data.id)
        dispatch({type: AUTH_USER, payload: response.data.token, id: response.data.id})
        localStorage.setItem('token', response.data.token) //storing JWT inside local storage (cookies)
        localStorage.setItem('id', response.data.id)
        localStorage.setItem('username', response.data.username)
        callback()
    }
    catch(e){
        dispatch({type: AUTH_ERROR, payload: "Invalid Login Credentials."}) //error to put into store to display on page
    }
}

export const signout = () => {
    localStorage.removeItem('token') //clear out local storage on sign out
    localStorage.removeItem('id')
    localStorage.removeItem('username')
    return{
        type: AUTH_USER,
        payload: '', //sending empty string to clear out state
        id: 0
    }
}

export const saveToDB = (data) => async dispatch => {
    // console.log(data)
    axios.post('/savedata', {userid: data.userid, title: data.title, note: data.note, rating:data.rating, username:data.username})
}

export const saveFriendToDB = (data) => async dispatch => {
    console.log(data)
    axios.post('/saveFriendData', {friendemail: data.friendemail, friendid: data.friendid, userid: data.userid})
}

export function saveStar(starRating) {
    console.log(`starRating in the action: ${starRating.rating}`)
    return {
        type: SAVE_STAR, 
        starRating: starRating.rating
        }
}


export const saveIdAction = (id) => async dispatch => {
    console.log(id.id)
    axios.post('/friendsTable', {id: id})
}

export const saveVisitor = (data) => async dispatch => {
    console.log(data.comment)
    axios.post('/visitorsTable', {name: data.name, email: data.email, comment: data.comment})
}













// export const saveStar = (starRating)  => async dispatch => {
//     try{
//     console.log(`starRating: ${starRating.rating}`)
//     dispatch({
//         type: SAVE_STAR, 
//         starRating: starRating.rating
//         })
//     }
//     catch{

//     }
// }