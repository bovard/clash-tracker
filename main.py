import logging
import json
import os

from google.appengine.api import users
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import ndb


from lib import bottle
from lib.bottle import abort, post, get, request, error, debug, redirect, response, static_file

import routes
import test

"""
@get('/')
def display_home():
    auth_required()
    return static_file('index.html', root='./')
"""

def auth_required():
    user = users.get_current_user()
    logging.debug("Checking auth!")
    if not user:
        logging.warning("not auth'd!")
        redirect(users.create_login_url(request.url))

def clan_admin_required(clan, user):
    if user not in clan.admins:
        abort(403, 'not a clan admin')


def _safe_get_entity(entity_key, model_type=None):
    entity = ndb.Key(urlsafe=entity_key).get()
    if not entity:
        abort(404, 'entity not found')

    if model_type:
        if not isinstance(entity, model_type):
            abort(403, 'not the right type')

    return entity


@post('/clan/:clan_name')
def create_clan(clan_name):
    auth_required()
    user = users.get_current_user()
    logging.info("created a new clan {} with user {}".format(clan_name, user.nickname()))
    clan = models.Clan(
        admins=[user],
        name=clan_name,
    )
    clan.put()
    return models.clan_to_json(clan)


@post('/clan/:clan_key/member/:member_name')
def create_clan_member(clan_key, member_name):
    auth_required()

    user = users.get_current_user()

    clan = _safe_get_entity(clan_key)
    clan_admin_required(clan, user)

    member = models.ClanMember(
        parent=clan,
        name=member_name
    )
    member.put()
    return models.clan_member_to_json(member)


@get('/clans/')
def get_all_clans():
    from lib.bottle import response
    from json import dumps
    clans = models.Clan.query().order(models.Clan.created).fetch()
    to_return = [models.clan_to_json(clan) for clan in clans]
    response.content_type = 'application/json'
    return dumps(to_return)

@get('/my_clans/')
def get_my_clans():
    from lib.bottle import response
    from json import dumps
    user = users.get_current_user()
    clans = models.Clan.query().filter(models.Clan.admins.IN([user])).order(models.Clan.created).fetch()
    to_return = [models.clan_to_json(clan) for clan in clans]
    response.content_type = 'application/json'
    return dumps(to_return)



@get('/clan/:clan_key/members/')
def get_clan_members(clan_key):
    clan = _safe_get_entity(clan_key)
    members = models.ClanMember(parent=clan)
    return [models.clan_member_to_json(member) for member in members]

@get('/member/:member_key')
def get_member(member_key):
    member = _safe_get_entity(member_key)
    return models.clan_member_to_json(member)


@get('/clan/:clan_key')
def get_clan(clan_key):
    clan = _safe_get_entity(clan_key)
    return models.clan_to_json(clan)


@get('/clan/:clan_key/donation_cycles/')
def get_clan_donation_cycles(clan_key):
    clan = _safe_get_entity(clan_key, model_type=models.Clan)
    cycles = models.DonationCycle(parent=clan)
    return [models.donation_cycle_to_json(cycle) for cycle in cycles]

@post('/clan/:clan_key/donation_cycle')
def create_new_donation_cycle(clan_key):
    clan = _safe_get_entity(clan_key)

    cycle = models.DonationCycle(
        parent=clan
    )
    return models.donation_cycle_to_json(cycle)


def main():
    debug(True)
    app = bottle.app()
    run_wsgi_app(app)


@error(403)
def error_403(code):
    return "not authorized (403)"

@error(404)
def error_404(code):
    return "not found! (404)"

if __name__ == "__main__":
    main()
