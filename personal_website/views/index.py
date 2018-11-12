from personal_website import app
from flask import render_template, request, redirect, url_for

@app.route('/', methods=['GET'])
@app.route('/index', methods=['GET'])
def index():
    if request.method == 'GET':
        return render_template('index.html')
    return redirect(url_for('index'))

@app.route('/blog/c', methods=['GET'])
def c_blog():
    return render_template('c_blog.html')

@app.route('/blog/python', methods=['GET'])
def python_blog():
    return render_template('python_blog.html')

@app.route('/blog/rust', methods=['GET'])
def rust_blog():
    return render_template('rust_blog.html')

@app.route('/blog/css3', methods=['GET'])
def css3_blog():
    return render_template('css3_blog.html')
