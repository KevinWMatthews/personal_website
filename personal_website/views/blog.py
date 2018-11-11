from personal_website import app
from flask import render_template

@app.route('/blog/<post>', methods=['GET'])
def blog_post(post):
    return render_template('{}.html'.format(post))
