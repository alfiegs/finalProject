import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

//Components
import Feature from './components/Feature';
import SignIn from './components/auth/SignIn';
import SignOut from './components/auth/SignOut';
import SignUp from './components/auth/SignUp';
import Welcome from './components/Welcome';
import Page from './components/Page';
import Start from './components/Start';
import Test from './components/Test';
import Users from './components/Users';
import YourFeed from './components/YourFeed';
import FriendsFeed from './components/FriendsFeed';
import Movie from './components/Movie';
import Other from './components/Other';
import FriendList from './components/FriendList';
import Book from './components/Book';
import Place from './components/Place';
import Contact from './components/Contact';



import reducers from './reducers/';
import reduxThunk from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


let store = createStore(reducers, {
    auth: {authenticated: localStorage.getItem('token')} //finding token in local storage so that user doesn't have to log in again; token is the name of the JWT we gave when we put it in local storage
}, 
composeEnhancers(applyMiddleware(reduxThunk)))

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
        <App>
            <Switch>
            <Route exact path='/' component={Welcome}></Route>
            <Route path='/feature' component={Feature}></Route>
            <Route path='/signin' component={SignIn}></Route>
            <Route path='/signout' component={SignOut}></Route>
            <Route path='/signup' component={SignUp}></Route>
            <Route path='/page2' component={Page}></Route>
            <Route path='/start' component={Start}></Route>
            <Route path='/test' component={Test}></Route>
            <Route path='/users' component={Users}></Route>
            <Route path='/yourfeed' component={YourFeed}></Route>
            <Route path='/friendsfeed' component={FriendsFeed}></Route>
            <Route path='/movie' component={Movie}></Route>
            <Route path='/other' component={Other}></Route>
            <Route path='/friendlist' component={FriendList}></Route>
            <Route path='/book' component={Book}></Route>
            <Route path='/place' component={Place}></Route>
            <Route path='/contact' component={Contact}></Route>
            </Switch>
        </App>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));


