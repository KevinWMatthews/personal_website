from personal_website import app
from flask import render_template, redirect, url_for
from flask_wtf import FlaskForm
from wtforms.fields import SubmitField, SelectField


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
        product_url = form.product.data
        return redirect(url_for(product_url))
    return render_template('embedded_code.html', form=form)
