import React from 'react';

class Page extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
           songName: 'Bling Lights',
           coverUrl: 'https://upload.wikimedia.org/wikipedia/tr/e/e6/The_Weeknd_-_Blinding_Lights.png',
           songLyrics: 'Yeah\n' +
               '\n' +
               'I\'ve been tryna call\n' +
               'I\'ve been on my own for long enough\n' +
               'Maybe you can show me how to love, maybe\n' +
               'I\'m going through withdrawals\n' +
               'You don\'t even have to do too much\n' +
               'You can turn me on with just a touch, baby\n' +
               '\n' +
               'I look around and\n' +
               'Sin City\'s cold and empty (Oh)\n' +
               'No one\'s around to judge me (Oh)\n' +
               'I can\'t see clearly when you\'re gone\n' +
               '\n' +
               'I said, ooh, I\'m blinded by the lights\n' +
               'No, I can\'t sleep until I feel your touch\n' +
               'I said, ooh, I\'m drowning in the night\n' +
               'Oh, when I\'m like this, you\'re the one I trust\n' +
               'Hey, hey, hey\n' +
               '\n' +
               'I\'m running out of time\n' +
               '\'Cause I can see the sun light up the sky\n' +
               'So I hit the road in overdrive, baby, oh\n' +
               '\n' +
               'The city\'s cold and empty (Oh)\n' +
               'No one\'s around to judge me (Oh)\n' +
               'I can\'t see clearly when you\'re gone\n' +
               '\n' +
               'I said, ooh, I\'m blinded by the lights\n' +
               'No, I can\'t sleep until I feel your touch\n' +
               'I said, ooh, I\'m drowning in the night\n' +
               'Oh, when I\'m like this, you\'re the one I trust\n' +
               '\n' +
               'I\'m just walking by to let you know (By to let you know)\n' +
               'I can never say it on the phone (Say it on the phone)\n' +
               'Will never let you go this time (Ooh)\n' +
               '\n' +
               'I said, ooh, I\'m blinded by the lights\n' +
               'No, I can\'t sleep until I feel your touch\n' +
               'Hey, hey, hey\n' +
               'Hey, hey, hey\n' +
               '\n' +
               'I said, ooh, I\'m blinded by the lights\n' +
               'No, I can\'t sleep until I feel your touch'
        };
    }

    render() {
        const songName = this.state.songName;
        const coverUrl = this.state.coverUrl;
        const songLyrics = this.state.songLyrics;

        return(
            <div>
                <h1>{songName}</h1>
                <img src={coverUrl} alt={songName}/>
                <p>{songLyrics}</p>
            </div>

        );
    }

}

export default Page;
