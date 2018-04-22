# Personal website

This will be my website.

## Getting Started

### Requirements

* Python
* virtualenv

### Setup

Create and activate a virtual environment
```
$ virtualenv -p python3 venv
$ source venv/bin/activate
```

Install requirements
```
$ pip install -r requirements.txt
```

### Run

```
$ export FLASK_APP=personal_website.py
$ export PERSONAL_WEBSITE_SETTINGS=/path/to/your/settings.cfg
$ flask run
```

To run in debug mode,
```
$ export FLASK_DEBUG=1
```
