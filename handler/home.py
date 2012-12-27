import tornado.web
import basehandler

class handler(basehandler.BaseHandler):

	def initialize(self):
		self.con = self.application.con
	
	@tornado.web.authenticated	
	def get(self):
		self.render("home/home.html")
		
	@tornado.web.authenticated
	def post(self):
		azione = self.get_argument("azione", default="")
