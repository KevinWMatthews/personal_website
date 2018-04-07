#!/usr/bin/env python

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/embedded_code')
def embedded_code():
    return render_template('embedded_code.html')

if __name__ == '__main__':
    app.run(debug=True)
