from personal_website import app, make_commands
from flask import render_template, jsonify
import shlex, subprocess

@app.route('/blink-one', methods=['GET'])
def blink_one():
    return render_template('blink-one.html')

@app.route('/blink-one/run-tests', methods=['POST'])
def run_tests():
    print('Blink one: run tests')
    dir = app.config['BUILD_DIR_BLINK_ONE_TEST']
    make_commands.make_clean(dir)
    make_commands.make_default(dir)
    make_commands.make_test(dir)

    return jsonify('Flask ran blink one, tests')

@app.route('/blink-one/run-production', methods=['POST'])
def run_production():
    print('Blink one: run production')
    dir = app.config['BUILD_DIR_BLINK_ONE_PRODUCTION']
    make_commands.make_clean(dir)
    make_commands.make_default(dir)
    #TODO Hook up production code to webpage elements
    return jsonify('Flask ran blink one, production')
