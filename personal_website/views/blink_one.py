from personal_website import app
from flask import render_template, jsonify

@app.route('/blink-one', methods=['GET'])
def blink_one():
    return render_template('blink-one.html')

@app.route('/blink-one/run-tests', methods=['POST'])
def run_tests():
    print('Blink one: run tests')
    return jsonify('Flask ran blink one, tests')

@app.route('/blink-one/run-production', methods=['POST'])
def run_production():
    print('Blink one: run production')
    return jsonify('Flask ran blink one, production')
