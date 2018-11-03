from personal_website import app
from flask import render_template, request, redirect, url_for

@app.route('/blog/<post>', methods=['GET'])
def blog(post):
    return render_template('{}.html'.format(post))
