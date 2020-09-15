from flask import render_template, session, redirect, request
from app import app
import spotipy
import uuid
import os

caches_folder = './.spotify_caches/'
if not os.path.exists(caches_folder):
    os.makedirs(caches_folder)


def session_cache_path():
    return caches_folder + session.get('uuid')


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
        auth_url = auth_manager.get_authorize_url()
        return render_template('index.html', auth_url=auth_url)
        # return f'<h2><a href="{auth_url}">Sign in</a></h2>'

    # Step 4. Signed in, display data
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    print(spotify.me())
    return f'<h2>Hi {spotify.me()["display_name"]}, ' \
           f'<small><a href="/sign_out">[sign out]<a/></small></h2>' \
           f'<a href="/playlists">my playlists</a> | ' \
           f'<a href="/currently_playing">currently playing</a> | ' \
           f'<a href="/current_user">me</a>'


@app.route('/current_user')
def current_user():
    auth_manager = spotipy.oauth2.SpotifyOAuth(cache_path=session_cache_path())
    if not auth_manager.get_cached_token():
        return redirect('/')
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    print(spotify.current_user())
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
