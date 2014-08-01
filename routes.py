from lib import bottle
from lib.bottle import abort, post, get, request, error, debug, redirect, response, static_file

import logging

from google.appengine.api import users
from google.appengine.ext import ndb

@get('/')
def display_home():
    auth_required()
    return static_file('index.html', root='./')

def auth_required():
    user = users.get_current_user()
    logging.debug("Checking auth!")
    if not user:
        logging.warning("not auth'd!")
        redirect(users.create_login_url(request.url))
