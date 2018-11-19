from personal_website import app

@app.shell_context_processor
def make_shell_context():
    return {}
