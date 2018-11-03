from flask import Flask
from flask_socketio import SocketIO
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
socketio = SocketIO(app)

from personal_website.views import index
from personal_website.views import blog
from personal_website.views import embedded_code, blink_one, blink_two
