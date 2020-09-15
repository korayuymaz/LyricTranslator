from flask import Flask

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'b77ece784e27cf7b42137c32fbee5ba4'
app.config['SESSION_FILE_DIR'] = './.flask_session/'

from app import routes