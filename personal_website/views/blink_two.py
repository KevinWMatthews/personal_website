from personal_website import app
from flask import render_template, redirect, url_for

@app.route('/blink-two', methods=['GET'])
def blink_two():
    return render_template('blink-two.html')
