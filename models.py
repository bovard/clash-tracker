from google.appengine.ext import ndb

class Clan(ndb.Model):
    admins = ndb.UserProperty(repeated=True)
    name = ndb.StringProperty()
    created = ndb.DateTimeProperty(auto_now_add=True)


def clan_to_json(clan):
    admins = []
    for admin in clan.admins:
        admins.append(admin.nickname())

    return {
        'admins': admins,
        'key': clan.key.urlsafe(),
        'name': clan.name
    }


class ClanMember(ndb.Model):
    # parent Clan
    joined = ndb.DateProperty(auto_now_add=True)
    name = ndb.StringProperty()


def clan_member_to_json(member):
    return {
        'clan_key': member.parent.urlsafe(),
        'name': member.name,
        'joined': member.joined,
        'key': member.key.urlsafe()
    }


class DonationCycle(ndb.Model):
    # parent Clan
    date = ndb.DateProperty(auto_now_add=True)
    total = ndb.IntegerProperty(default=0)

def donation_cycle_to_json(cycle):
    return {
        'date': cycle.date,
        'clan_key': cycle.parent.urlsafe(),
        'key': cycle.key.urlsafe(),
        'total': cycle.total_donated
    }

class Donation(ndb.Model):
    # parent DonationCycle
    member = ndb.KeyProperty(kind=ClanMember)
    donated = ndb.IntegerProperty(default=0)
    received = ndb.IntegerProperty(default=0)

def donation_to_json(donation):
    return {
        'donated': donation.donated,
        'donation_cycle_key': donation.parent.urlsafe(),
        'key': donation.key.urlsafe(),
        'member_key': donation.member.urlsafe(),
        'received': donation.received
    }

