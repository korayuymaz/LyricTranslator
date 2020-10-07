from flask import render_template, session, redirect, request
from app import app
import spotipy
import uuid
import os
import lyricsgenius
import json

caches_folder = './.spotify_caches/'
if not os.path.exists(caches_folder):
    os.makedirs(caches_folder)


def session_cache_path():
    return caches_folder + session.get('uuid')


GENIUS_SECRET_KEY = os.environ.get('GENIUS_SECRET_KEY')
genius = lyricsgenius.Genius(GENIUS_SECRET_KEY)
genius.verbose = False


# @app.route("/")
# def my_index():
#     return render_template("index.html", token="Flask Token")

@app.route('/')
def index():
    if not session.get('uuid'):
        # Step 1. Visitor is unknown, give random ID
        session['uuid'] = str(uuid.uuid4())
    auth_manager = spotipy.oauth2.SpotifyOAuth(scope='user-read-currently-playing playlist-modify-private',
                                               cache_path=session_cache_path(),
                                               show_dialog=True)

    if request.args.get("code"):
        # print('token =', request.args.get("code"))
        # Step 3. Being redirected from Spotify auth page
        auth_manager.get_access_token(request.args.get("code"))
        # print('token 2=', auth_manager.get_access_token(request.args.get("code")))
        return redirect('/')

    """ Ben burada kullanıcı login olabilsin diye, auth_url'i tanımlıyorum. Sonrasında ise bu değişkeni ana html'miz olan
    index.html de kullanılabilmesi için auth_url olarak html sayfasına yolluyorum. sayfa sadece ana sayfa olacak ve 
    sign in butonunun içine auth_url gömülecek."""
    if not auth_manager.get_cached_token():
        # Step 2. Display sign in link when no token
        auth_url = str(auth_manager.get_authorize_url())
        return render_template('index.html', auth_url=auth_url, page_name='sign_in')
        # return f'<h2><a href="{auth_url}">Sign in</a></h2>'

    # Step 4. Signed in, display data
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    my_profile = spotify.me()
    return render_template('index.html', my_profile=my_profile, page_name='my_profile')


@app.route('/current_user')
def current_user():
    auth_manager = spotipy.oauth2.SpotifyOAuth(cache_path=session_cache_path())
    if not auth_manager.get_cached_token():
        return redirect('/')
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    return spotify.current_user()


@app.route('/sign_out')
def sign_out():
    os.remove(session_cache_path())
    session.clear()
    try:
        # Remove the CACHE file (.cache-test) so that a new user can authorize.
        # os.remove(session_cache_path())
        return redirect('/')
    except OSError as e:
        print("Error: %s - %s." % (e.filename, e.strerror))
    return redirect('/')


@app.route('/playlists')
def playlists():
    auth_manager = spotipy.oauth2.SpotifyOAuth(cache_path=session_cache_path())
    if not auth_manager.get_cached_token():
        return redirect('/')

    spotify = spotipy.Spotify(auth_manager=auth_manager)
    return spotify.current_user_playlists()


@app.route('/currently_playing')
def currently_playing():
    auth_manager = spotipy.oauth2.SpotifyOAuth(cache_path=session_cache_path())
    if not auth_manager.get_cached_token():
        return redirect('/')
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    track = spotify.current_user_playing_track()
    if not track is None:
        artist = track['item']['artists'][0]['name']
        image = track['item']['album']['images'][1]['url']
        song_name = track['item']['name']
        genius_song = genius.search_song(song_name, artist)
        lyrics = json.dumps(genius_song.lyrics)
        return render_template('index.html', page_name='currently_playing', artist=artist, image=image,
                               song_name=song_name, lyrics=lyrics)
    return "No track currently playing."
