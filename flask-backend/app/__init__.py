from flask import Flask, render_template, request

app = Flask(__name__)
app.config['DEBUG'] = True

from app import routes