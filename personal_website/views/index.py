from personal_website import app
from flask import render_template, request, redirect, url_for

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html')
    if 'btnCss' in request.form.keys():
        return redirect(url_for('css3'))
    return redirect(url_for('index'))

@app.route('/css3', methods=['GET'])
def css3():
    return render_template('css3.html')
