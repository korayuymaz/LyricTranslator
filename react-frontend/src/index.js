import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import SignIn from "./components/SignIn";
import MyProfile from "./components/MyProfile";
import CurrentlyPlaying from "./components/CurrentlyPlaying";

if (window.token.page === 'sign_in') {
    ReactDOM.render(
        <SignIn/>,
        document.getElementById('root')
    );
} else if (window.token.page === 'my_profile') {
    ReactDOM.render(
        <MyProfile/>,
        document.getElementById('root')
    );
} else if (window.token.page === 'currently_playing') {
    ReactDOM.render(
        <CurrentlyPlaying/>,
        document.getElementById('root')
    );
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
