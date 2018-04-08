from personal_website import app
from flask import render_template

@app.route('/blink-one', methods=['GET'])
def blink_one():
    return render_template('blink-one.html')


