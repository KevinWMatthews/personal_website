from app import app
from flask import render_template, request, redirect, url_for

blog_card_home = {
    'text': 'All Posts',
    'url': 'https://blog.kevinwmatthews.com',
    'id': 'all_posts',
}
blog_card_c = {
    'text': 'C',
    'url': 'https://blog.kevinwmatthews.com/tags/#c',
    'id': 'c',
}
blog_card_python = {
    'text': 'Python',
    'url': 'https://blog.kevinwmatthews.com/tags/#python',
    'id': 'python',
}
blog_card_rust = {
    'text': 'Rust',
    'url': 'https://blog.kevinwmatthews.com/tags/#rust',
    'id': 'rust',
}
blog_card_css = {
    'text': 'CSS',
    'url': 'https://blog.kevinwmatthews.com/tags/#css',
    'id': 'css',
}
blog_card_cmake = {
    'text': 'CMake',
    'url': 'https://blog.kevinwmatthews.com/tags/#cmake',
    'id': 'cmake',
}
blog_card_docker = {
    'text': 'Docker',
    'url': 'https://blog.kevinwmatthews.com/tags/#docker',
    'id': 'docker',
}
cards = [
    blog_card_home,
    blog_card_c,
    blog_card_cmake,
    blog_card_python,
    blog_card_rust,
    blog_card_docker,
]

@app.route('/', methods=['GET'])
@app.route('/index.html', methods=['GET'])
def index():
    return render_template('index.html', cards=cards)
