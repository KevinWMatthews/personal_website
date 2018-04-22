from flask import Flask

app = Flask(__name__)
app.config.from_envvar('PERSONAL_WEBSITE_SETTINGS')
app.config['SECRET_KEY'] = 'Set from an environment variable'

from personal_website.views import index
from personal_website.views import embedded_code
from personal_website.views import blink_one
from personal_website.views import blink_two
