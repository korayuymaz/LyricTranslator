import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import SignIn from "./components/SignIn";
import MyProfile from "./components/MyProfile";

if (window.token.page === 'sign_in') {
    ReactDOM.render(
        <React.StrictMode>
            <SignIn/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}else if(window.token.page === 'my_profile'){
    ReactDOM.render(
        <React.StrictMode>
            <MyProfile />
        </React.StrictMode>,
        document.getElementById('root')
    );
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
