import tornado.web
import basehandler

from datetime import datetime

class handler(basehandler.BaseHandler):

	def initialize(self):
		self.retCode = dict()
		self.con = self.application.con
	
	@tornado.web.authenticated	
	def get(self):
		anno = self.get_argument("anno")
		self.render("viewstat/viewstat.html", anno=anno)
		
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
		
		elif (azione == 'setEntrate'):
			mm = self.get_argument('mese')
			yy = self.get_argument('anno')
			entrate = self.get_argument('entrate')
			
			stato = 0
			try:
				query = " \
					SELECT ID_entrata FROM entrate WHERE mese = %s AND anno = %s; \
				" % (int(mm), int(yy))
				cur.execute(query)
				rs = cur.fetchone()
				# Insert Entrate
				if rs == None:
					query = " \
						INSERT INTO entrate (mese, anno, entrata) \
						VALUES ( %s, %s, %s ); \
					" % (int(mm), int(yy), float(entrate))
					cur.execute(query)
					self.con.commit()
				# Update Entrate
				else:
					query = " \
						UPDATE entrate \
						SET entrata = %s \
						WHERE ID_entrata = %s \
					" % (float(entrate), int(rs[0]))
					cur.execute(query)
					self.con.commit()
			except:
				stato = 1
				self.con.rollback()
			
			self.retCode['stato'] = stato
			self.write(tornado.escape.json_encode(self.retCode))
