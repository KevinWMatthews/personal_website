from personal_website import app
from flask import render_template, request, redirect, url_for

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html')
    return redirect(url_for('index'))
