import tornado.web
import basehandler

from datetime import datetime

class handler(basehandler.BaseHandler):

	def initialize(self):
		self.retCode = dict()
		self.con = self.application.con
	
	@tornado.web.authenticated	
	def get(self):
		self.render("viewstat/viewstat.html")
		
	@tornado.web.authenticated
	def post(self):
		cur = self.con.cursor()
		azione = self.get_argument("azione", default="")
		
		if (azione == 'viewmonthstat'):
			mm = self.get_argument('mese')
			yy = self.get_argument('anno')
			
			elSpese = list()
			try: 
				query = " \
					SELECT ID_elencospesa, data, categoria, sottocategoria, descrizione, importo \
					FROM elencospese \
					WHERE MONTH(data) = %s AND YEAR(data) = %s\
					ORDER BY data \
				" % (int(mm), int(yy))
				cur.execute(query)
				rs = cur.fetchall()
				for record in rs: 
					d = dict()
					d['ID_elencospesa'] = record[0]
					d['data'] = record[1].strftime('%d-%m-%Y')
					d['categoria'] = record[2]
					d['sottocategoria'] = record[3]
					d['descrizione'] = record[4]
					d['importo'] = record[5]					
					elSpese.append(d)
				
				query = " \
					SELECT entrata \
					FROM entrate \
					WHERE mese  = %s AND anno = %s \
				" % (int(mm), int(yy))
				cur.execute(query)
				rs = cur.fetchone()
				if rs == None:
					entrate = 0
				else:
					entrate = rs[0]
				

					
			except:
				print 'Errore'
			
			retdata = list()
			retdata.append(elSpese)
			retdata.append(entrate)
			self.write(tornado.escape.json_encode(retdata))
				
