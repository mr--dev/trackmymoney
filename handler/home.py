import tornado.web
import basehandler

class handler(basehandler.BaseHandler):

	def initialize(self):
		self.retCode = dict()
		self.con = self.application.con
	
	@tornado.web.authenticated	
	def get(self):
		self.render("home/home.html")
		
	@tornado.web.authenticated
	def post(self):
		azione = self.get_argument("azione", default="")
		
		if (azione == 'addSpesa'):
			d = tornado.escape.json_decode(self.get_argument('data'))
			cat = d['cat']
			subcat = d['subcat']
			data = d['data']
			descrizione = d['descrizione']
			importo = d['importo']
			
			self.retCode['stato'] = 0;
			self.retCode['messaggio'] = 'Record inserito correttamente'
			self.write(tornado.escape.json_encode(self.retCode))
