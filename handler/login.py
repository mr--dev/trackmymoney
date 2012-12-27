import tornado.web

class handler(tornado.web.RequestHandler):

	def initialize(self):
		self.con = self.application.con
	
	def get(self):
		self.render("login.html")
		
	def post(self):
		azione = self.get_argument("azione", default="")
		
		# Controllo LOGIN
		if (azione == ""):
			username = self.get_argument("username", default="")
			password = self.get_argument("password", default="")		
			
			cur = self.con.cursor()
			cur.execute("SELECT COUNT(DISTINCT ID_login) \
							 FROM login \
							 WHERE username = '"+username+"' AND password = '"+password+"'; ")
			data = cur.fetchone()

			if (data[0] == 1) :
				self.set_secure_cookie("user", username, None)
				self.redirect("/")
			else :
				self.render("login.html")
		
		elif (azione == "logout"):
			self.clear_cookie("user")
