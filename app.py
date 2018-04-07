#!/usr/bin/env python

from flask import Flask, render_template, redirect, url_for
from flask_wtf import FlaskForm
from wtforms.fields import SubmitField, SelectField

app = Flask(__name__)
app.config['SECRET_KEY'] = 'Set from an environment variable'

@app.route('/')
def index():
    return render_template('index.html')

class ProductSelectForm(FlaskForm):
    product = SelectField('Products', choices=[
        ('blink_one', 'Blink Single LED'),
        ('blink_two', 'Blink Two LEDs')],
    )
    submit = SubmitField('Submit')

@app.route('/embedded-code', methods=['GET', 'POST'])
def embedded_code():
    form = ProductSelectForm()
    if form.validate_on_submit():
        if form.product.data == 'blink_one':
            return redirect(url_for('blink_one'))
        elif form.product.data == 'blink_two':
            return redirect(url_for('blink_two'))
        else:
            print('Invalid selection')
        return redirect(url_for('embedded_code'))
    return render_template('embedded_code.html', form=form)

@app.route('/blink-one', methods=['GET'])
def blink_one():
    return render_template('blink-one.html')

@app.route('/blink-two', methods=['GET'])
def blink_two():
    return render_template('blink-two.html')

if __name__ == '__main__':
    app.run(debug=True)
