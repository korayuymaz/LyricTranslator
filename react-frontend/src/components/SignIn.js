import React from 'react';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: window.token,
        };
        this.handleUrl = this.handleUrl.bind(this);
    }
    handleUrl(){
        window.location = this.state.url
    }
    render() {
        return(
            <div>
                <button onClick={this.handleUrl}>
                    Sign In
                </button>
                <p>{this.state.url}</p>
            </div>
        )
    }
}

export default SignIn;
