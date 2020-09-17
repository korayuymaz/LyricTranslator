import React from 'react';
import '../styles/sign-in.css';

class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentlyPlayingUrl: window.location.href + 'currently_playing',
            signOutUrl: window.location.href + 'sign_out'
        };
        this.handleCurrentlyPlaying = this.handleCurrentlyPlaying.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }
    handleCurrentlyPlaying(){
        window.location.href = this.state.currentlyPlayingUrl
    }
    handleSignOut(){
        window.location.href = this.state.signOutUrl
    }
    render() {
        return(
            <div>
                <div id='btn' onClick={this.handleCurrentlyPlaying}>
                    <span className="no_select">Currently Playing</span>
                    <div id="circle"></div>
                </div>
                <div id='btn' onClick={this.handleSignOut}>
                    <span className="no_select">Sign Out</span>
                    <div id="circle"></div>
                </div>
            </div>
        )
    }
}

export default MyProfile;
