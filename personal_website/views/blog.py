from personal_website import app, blog_post
from flask import render_template

all_blog_posts = [
    blog_post.BlogPost(
        'hello-world',
        'Hello, World!',
        'Introduction to this blog.',
        ['C'],
        ),
    blog_post.BlogPost(
        'c-exit-callbacks',
        'Exit Callbacks using stdlib',
        'Construct from this skeleton <a href="https://github.com/KevinWMatthews/c-terminate_program" class="in-text-link">this GitHub repo</a>.',
        ['C', 'stdlib'],
        ),
    blog_post.BlogPost(
        '',
        'Test-Driven Design on AVR',
        'Work in progress... based on <a href="https://github.com/KevinWMatthews/c-libATtiny861" class="in-text-link">this GitHub repo</a>.',
        ['C', 'TDD', 'AVR'],
        ),
    blog_post.BlogPost(
        '',
        'TLS Using OpenSS',
        'Experimental but functional. Based on <a href="https://github.com/KevinWMatthews/c-tls_demo" class="in-text-link">this GitHub repo</a>.',
        ['C', 'Crypto'],
        ),
    blog_post.BlogPost(
        '',
        'Varargs (variadics)',
        'Closest thing to the splat operator that C can provide. Based on <a href="https://github.com/KevinWMatthews/c-varargs_demo" class="in-text-link">this GitHub repo</a>.',
        ['C'],
        ),
    blog_post.BlogPost(
        '',
        'Parsing Command Line Options',
        'Better than strcmp() on argv. Based on <a href="https://github.com/KevinWMatthews/c-getopt_demo" class="in-text-link">this GitHub repo</a>.',
        ['C'],
        ),
    blog_post.BlogPost(
        '',
        'Simple C Socket Server',
        'And a client, too. Based on <a href="https://github.com/KevinWMatthews/c-server_demo" class="in-text-link">this GitHub repo</a>.',
        ['C'],
        ),
    blog_post.BlogPost(
        '',
        'Memory Semantics',
        'Dive under the hood. Based on <a href="https://youtu.be/-dc5vqt2tgA" class="in-text-link">this awesome video</a>.',
        ['C'],
        ),
]

@app.route('/blog', methods=['GET'])
def blog_home():
    return render_template('blog_home.html', posts=all_blog_posts)

@app.route('/blog/<post>', methods=['GET'])
def blog_post(post):
    return render_template('{}.html'.format(post))

@app.route('/blog/about-me', methods=['GET'])
def about_me():
    return render_template('about_me.html')

@app.route('/blog/about-this-blog', methods=['GET'])
def blog_about():
    return render_template('blog_about.html')

@app.route('/blog/category/<category>', methods=['GET'])
def blog_by_category(category):
    # Convert to database - do this just to get off the ground.
    # Sanitize input!!
    posts_in_category = []
    for post in all_blog_posts:
        for tag in post.tags:
            if tag == category:
                posts_in_category.append(post)
    return render_template('blog_home.html', posts=posts_in_category)
