import tornado.web
import basehandler

from datetime import datetime

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
			
			dd = data[0:2]
			mm = data[3:5]
			yyyy = data[6:10]
			data = datetime(int(yyyy), int(mm), int(dd))
			
			stato = 0
			try:
				query = " \
					INSERT INTO elencospese (categoria, sottocategoria, data, descrizione, importo) \
					VALUES ('%s', '%s', '%s', '%s', '%f') \
					" % (cat, subcat, data, descrizione, float(importo))
				cur = self.con.cursor()
				cur.execute(query)
				self.con.commit()
			except:
				stato = 1
				self.con.rollback()
			
			
			self.retCode['stato'] = stato
			self.retCode['messaggio'] = 'Record inserito correttamente'
			self.write(tornado.escape.json_encode(self.retCode))
