from app import app
from flask import render_template, request, redirect, url_for

blog_card_c = {
    'text': 'C',
    'url': 'https://blog.kevinwmatthews.com/category/c',
    'id': 'c',
}
blog_card_python = {
    'text': 'Python',
    'url': 'https://blog.kevinwmatthews.com/category/python',
    'id': 'python',
}
blog_card_rust = {
    'text': 'Rust',
    'url': 'https://blog.kevinwmatthews.com/category/rust',
    'id': 'rust',
}
blog_card_css = {
    'text': 'CSS',
    'url': 'https://blog.kevinwmatthews.com/category/css',
    'id': 'css',
}
cards = [
    blog_card_c,
    blog_card_python,
    blog_card_rust,
    blog_card_css,
]

@app.route('/', methods=['GET'])
@app.route('/index.html', methods=['GET'])
def index():
    return render_template('index.html', cards=cards)
