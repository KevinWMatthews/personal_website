from personal_website import app
from flask import render_template, request, redirect, url_for

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html')
    if 'btnC' in request.form.keys():
        return redirect(url_for('c_blog'))
    elif 'btnCss' in request.form.keys():
        return redirect(url_for('css3_blog'))
    return redirect(url_for('index'))

@app.route('/c', methods=['GET'])
def c_blog():
    return render_template('c_blog.html')

@app.route('/css3', methods=['GET'])
def css3_blog():
    return render_template('css3_blog.html')
