import flask
from app import app

@app.route("/")
def my_index():
    return flask.render_template("index.html", token="Flask Token")
