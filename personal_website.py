from app import app

@app.shell_context_processor
def make_shell_context():
    return {}

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description='Create static website content')
    parser.add_argument('-b', '--build', help="Build static pages", action='store_true')
    parser.add_argument('-t', '--test', help="Serve static pages from test server", action='store_true')
    args = parser.parse_args()

    if args.build:
        print('Building static files')
    elif args.test:
        print('Serving static files')
    else:
        parser.print_help()
        parser.exit()

    from flask_frozen import Freezer
    freezer = Freezer(app)
    if args.build:
        freezer.freeze()
    elif args.test:
        freezer.run()
