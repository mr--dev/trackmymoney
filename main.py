#!/usr/bin/env python
#

import tornado.ioloop
import tornado.web
import os.path
import json
import MySQLdb as mdb

import config
from handler import login, home, viewstat

settings = {
	"static_path": os.path.join(os.path.dirname(__file__), "static"),
	"templates_path": os.path.join(os.path.dirname(__file__), "templates"),
	"lib_path": os.path.join(os.path.dirname(__file__), "lib"),
	"handler_path": os.path.join(os.path.dirname(__file__), "handler"),
	"cookie_secret" : "YmIUp7tXR3GMrNDFkIArA5/wHHjKcUw/k/ibF8unTr0=",
	"login_url" : "/login"
}

application = tornado.web.Application([

	(r"/login", login.handler),
	(r"/home", home.handler),
	(r"/viewstat", viewstat.handler),
	(r"/static/(.*)", tornado.web.StaticFileHandler, dict(path=settings['static_path'])),
	(r"/(favicon.ico)", tornado.web.StaticFileHandler, dict(path=settings['static_path'])),
	(r"/", home.handler),

],autoescape=None, debug=True, template_path = settings['templates_path'], cookie_secret = settings['cookie_secret'], login_url = settings['login_url'])

if __name__ == "__main__":
	# application.listen(config['port'], address='127.0.0.1')
	application.listen(config.port)
	application.con = mdb.connect(config.db_host, config.db_user, config.db_pass, config.db_name, charset='utf8')
	tornado.ioloop.IOLoop.instance().start()
	tornado.autoreload.wait()
