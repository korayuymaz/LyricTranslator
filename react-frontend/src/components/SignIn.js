import React from 'react';
import '../styles/sign-in.css';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: window.token.toString().replaceAll("amp;", "")
        };
        this.handleUrl = this.handleUrl.bind(this);
    }
    handleUrl(){
        window.location.href = this.state.url
    }
    render() {
        return(
            <div>
                <div id='btn' onClick={this.handleUrl}>
                    <span className="no_select">Sign In</span>
                    <div id="circle"></div>
                </div>
            </div>
        )
    }
}

export default SignIn;
