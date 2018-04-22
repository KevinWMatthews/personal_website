from personal_website import app
from flask import render_template, jsonify

@app.route('/blink-one', methods=['GET'])
def blink_one():
    return render_template('blink-one.html')

@app.route('/blink-one/run-tests', methods=['POST'])
def run_tests():
    print('Blink one: run tests')
    return jsonify('Python works')
