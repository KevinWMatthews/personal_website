from flask import Flask
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

from personal_website.views import index
from personal_website.views import blog
