from personal_website import app, blog_post
from flask import render_template

all_blog_posts = [
    blog_post.BlogPost('c-hello-world', 'Hello, World!', 'Introduction to this blog.')
]

@app.route('/blog', methods=['GET'])
def blog_home():
    return render_template('blog_home.html', posts=all_blog_posts)

@app.route('/blog/<post>', methods=['GET'])
def blog_post(post):
    return render_template('{}.html'.format(post))
