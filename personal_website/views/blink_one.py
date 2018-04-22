from personal_website import app
from flask import render_template, jsonify
import shlex, subprocess

@app.route('/blink-one', methods=['GET'])
def blink_one():
    return render_template('blink-one.html')

c_code_dir = '/home/kevin/coding/c/led_controller/build'
@app.route('/blink-one/run-tests', methods=['POST'])
def run_tests():
    print('Blink one: run tests')
    command = 'make clean'
    args = shlex.split(command)
    result = subprocess.Popen(args, cwd=c_code_dir, stdout=subprocess.PIPE)
    print(result.stdout)

    # command = 'make'
    # args = shlex.split(command)
    # result = subprocess.Popen(args, cwd=c_code_dir)

    # command = 'make test'
    # args = shlex.split(command)
    # subprocess.Popen(args, cwd=c_code_dir)

    return jsonify('Flask ran blink one, tests')

@app.route('/blink-one/run-production', methods=['POST'])
def run_production():
    print('Blink one: run production')
    return jsonify('Flask ran blink one, production')
