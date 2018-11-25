from app import app
from flask import render_template, request, redirect, url_for

blog_card_c = {
    'text': 'C',
    'url': 'https://www.kevinwmatthews.com/blog/category/c',
    'id': 'c',
}
blog_card_python = {
    'text': 'Python',
    'url': 'https://www.kevinwmatthews.com/blog/category/python',
    'id': 'python',
}
blog_card_rust = {
    'text': 'Rust',
    'url': 'https://www.kevinwmatthews.com/blog/category/rust',
    'id': 'rust',
}
blog_card_css = {
    'text': 'CSS',
    'url': 'https://www.kevinwmatthews.com/blog/category/css',
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
