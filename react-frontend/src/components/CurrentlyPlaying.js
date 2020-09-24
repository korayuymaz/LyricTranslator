import React from 'react';
import '../styles/currently-playing.css';
class CurrentlyPlaying extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: window.token.artist,
            album_image: window.token.album_image,
            song_name: window.token.song_name,
        };
    }
    render() {
        const songName = this.state.song_name.toString().replaceAll("amp;", "").replaceAll("&#39;", "");
        const coverUrl = this.state.album_image.toString().replaceAll("amp;", "");
        const artist = this.state.artist.toString().replaceAll("amp;", "").replaceAll("&#39;", "'");
        return(
            <div class="currently-playing">
                <img src={coverUrl} alt={songName}/>
                <h1>{songName}</h1>
                <h2>{artist}</h2>
            </div>
        )
    }
}

export default CurrentlyPlaying;
