import React from 'react';
import '../styles/currently-playing.css';

class CurrentlyPlaying extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: window.token.artist,
            album_image: window.token.album_image,
            song_name: window.token.song_name,
            lyrics: window.token.lyrics
        };
    }

    // renderLyric() {
    //     const lyrics = this.state.lyrics.replaceAll("&#34;", "").replaceAll("amp;", "").replaceAll("&#39;", "'");
    //     let sentence = '';
    //     let html = '';
    //     let i;
    //     for (i = 0; i < lyrics.length; i++) {
    //         if (lyrics[i] === lyrics[i].toUpperCase()) {
    //             if (sentence !== '') {
    //                 html += <br> sentence </br>
    //
    //             }
    //             sentence = lyrics[i]
    //         } else {
    //             sentence += lyrics[i]
    //         }
    //     }
    //     return(
    //         html
    //     )
    // }

    render() {
        const songName = this.state.song_name.toString().replaceAll("amp;", "").replaceAll("&#39;", "");
        const coverUrl = this.state.album_image.toString().replaceAll("amp;", "");
        const artist = this.state.artist.toString().replaceAll("amp;", "").replaceAll("&#39;", "'");
        const lyrics = this.state.lyrics.replaceAll("&#34;", "").replaceAll("amp;", "").replaceAll("&#39;", "'");
        return (
            <div class="currently-playing">
                <img src={coverUrl} alt={songName}/>
                <h1>{songName}</h1>
                <h2>{artist}</h2>
                <p>
                    {lyrics}
                </p>
            </div>
        )
    }
}

export default CurrentlyPlaying;
