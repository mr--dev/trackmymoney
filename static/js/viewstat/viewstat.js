function ViewStat() {

	this.yy = 0;
	this.mm = 0;
	this.plot1 = null;
	this.plot2 = null;
	this.ID_elencospesa = null;	
	
	// Initializing: Icon-Category Association.
	this.iconcategory = {
		'casa' : '<i class="icon-home"></i>',
		'tempolibero' : '<i class="icon-glass"></i>',
		'abbigliamento' : '<i class="icon-tag"></i>',
		'alimentazione' : '<i class="icon-shopping-cart"></i>',
		'pagamenti' : '<i class="icon-briefcase"></i>',
		'macchina' : '<i class="icon-road"></i>',
		'vacanze' : '<i class="icon-plane"></i>',
		'altro' : '<i class="icon-film"></i>',
	}

	

	// Insert or update entrate for current month
	this.setEntrate = function() {	

		// Check for valid month
		if ($("#mese").val() != '') {
			// Check for valid value
			entrate = $("#entrate").val();
			if (isNumber(entrate)) {
				$("#loading-page").show();
				$("#entrate").removeClass('error');
				$.post('/viewstat', {'azione': 'setEntrate', 'anno': this.yy, 'mese': this.mm, 'entrate': entrate}, function(retdata){
					vsjs.updateSaldo();
					$("#loading-page").hide();
				});
			} else {
				$("#entrate").addClass('error');
			}
		}
		
	}
	
	/* Remove Spesa From DB */
	this.removeSpesa = function(ID_elencospesa) {
		bootbox.confirm('Sei sicuro di voler eliminare questo elemento?', 'No', 'Sì', function(result){
			if (result) {
				$("#loading-page").show();
				$.post('/viewstat', {'azione': 'removeSpesa', 'ID_elencospesa': ID_elencospesa}, function(retdata){
					$("#loading-page").hide();
					retCode = JSON.parse(retdata);
					bootbox.alert(retCode['messaggio'], function(){
						if (retCode['stato'] == 0) {
							vsjs.changeMonth();
						}
					})
					
				})
			}
		})
	}
	
	/* Update Spesa */
	this.updateSpesa = function () {
		$("#modale-modifica-spesa").modal('hide');
		data = {
			'ID_elencospesa': this.ID_elencospesa,
			'cat': $("#categoria").val(),
			'subcat': $("#sottocategoria").val(),
			'data': $("#data").val(),
			'descrizione': $("#descrizione").val(),
			'importo': $("#importo").val()
		}
		$.post('/viewstat', {'azione': 'updateSpesa', 'data': JSON.stringify(data)}, function(retdata){
			$("#loading-page").hide();
			retCode = JSON.parse(retdata);
			bootbox.alert(retCode['messaggio'], function(result){
				if (retCode['stato'] == 0)
					vsjs.changeMonth();
			});
		})

	}
	
	/* Edit spesa*/
	this.modificaSpesa = function(ID_elencospesa) {
		this.ID_elencospesa = ID_elencospesa;
		console.log('Modifica spesa');
		$("#loading-page").show();
		$.post('/viewstat', {'azione': 'modificaSpesa', 'ID_elencospesa': ID_elencospesa}, function(retdata){
			retdata = JSON.parse(retdata);
			record = retdata[0];
			subcat = retdata[1];
			$("#sottocategoria").children().remove();
			for (ii = 0; ii < subcat.length; ii++) {
				$("#sottocategoria").append('<option value='+subcat[ii]+'>'+subcat[ii]+'</option>');
			}
			$("#data").val(record['data']);
			$("#categoria").val(record['categoria']);
			$("#sottocategoria").val(record['sottocategoria']);
			$("#descrizione").val(record['descrizione']);
			$("#importo").val(record['importo']);
			$("#loading-page").hide();
			$("#modale-modifica-spesa").modal('show');
		})
	}
	
	/* Get Subcategory of selected category */
	this.changeCategory = function() {
		cat = $("#categoria").val();
		$.post('/viewstat', {'azione': 'changeCategory', 'cat': cat}, function(retdata){
			subcat = JSON.parse(retdata);
			$("#sottocategoria").children().remove();
			for (ii = 0; ii < subcat.length; ii++) {
				$("#sottocategoria").append('<option value='+subcat[ii]+'>'+subcat[ii]+'</option>');
			}		
		})
	}

	this.changeMonth = function() {
		
		// Check for valid month
		if ($("#mese").val() != '') {
		
			$("#loading-page").show();
			this.mm = $("#mese").val();
		
			$.post('/viewstat', {'azione': 'viewmonthstat', 'anno': this.yy, 'mese': this.mm}, function(retdata){
				retdata = JSON.parse(retdata);
				$("#elenco-spese-table").children().remove();
				// 
				uscite = retdata[0];
				entrate = retdata[1];
				datachart = retdata[2];
				tot_uscite = 0;
			
				for (ii = 0; ii < uscite.length; ii++){
					record = uscite[ii];
					$("#elenco-spese-table").append(
						'<tr>'+
						'	<td class="data">'+record['data']+'</td>'+
						'	<td class="categoria">'+vsjs.iconcategory[record['categoria']]+'</td>'+
						'	<td class="sottocategoria">'+record['sottocategoria']+'</td>'+
						'	<td class="descrizione">'+record['descrizione']+'</td>'+
						'	<td class="importo">'+record['importo']+'</td>'+
						'	<td class="modifica">'+
						'		<a class="mouse-link" onclick="javascript:vsjs.modificaSpesa('+record['ID_elencospesa']+')"><i class="icon-edit"></i></a>'+
						'	</td>'+
						'	<td class="elimina">'+
						'		<a class="mouse-link" onclick="javascript:vsjs.removeSpesa('+record['ID_elencospesa']+')"><i class="icon-remove"></i></a>'+
						'	</td>'+
						'</tr>'
					);
					tot_uscite += parseFloat(record['importo']);
				}
				$("#entrate").val(entrate);			
				$("#uscite").val(tot_uscite);
				vsjs.updateSaldo();
				vsjs.updateChart(datachart);
				$("#loading-page").hide();
			});
		}
	}
	
	this.updateChart = function(datachart) {
	
		// Pie Chart
		sc = [ "#dfdfdf", "#0f82f5", "#8d46b0", "#379f15", "#fe6600", "#e60033", "#958c12", "#030303"];
		this.plot1 = $.jqplot ('chart-div', [datachart], {
			seriesColors: sc,
			seriesDefaults: {
				renderer: $.jqplot.PieRenderer,
				rendererOptions: {
					showDataLabels: true,
					fill: false,
					sliceMargin: 4,
					lineWidth: 5
				}
			},
			legend: { show: true, location: 'e'}
		});
		
		// Bar Chart
		s = Array();
		plot2label = Array();
		plot2data = Array()
		
		for (ii = 0; ii < datachart.length; ii++) {
			el = datachart[ii];
			dict = {label: el[0]};
			plot2label.push(dict);
			plot2data.push([ el[1] ]);
		}
		this.plot2 = $.jqplot('chart-div2', plot2data, {
			seriesColors: sc,
      	seriesDefaults:{
				renderer:$.jqplot.BarRenderer,
				rendererOptions: {fillToZero: true},
				// pointLabels: { show: true }
			},
			series: plot2label,
			legend: {
				show: true,
				placement: 'outsideGrid'
			},
			axes: {
				xaxis: {
					renderer: $.jqplot.CategoryAxisRenderer
				},
				yaxis: {
					pad: 1.05,
					tickOptions: {formatString: '%d €'}
				}
			},
			axesDefaults: {
				min: 0
			}
		});
		this.showChart(1);
	}
	
	/* Very Ugly Code: I Manually Show Only Desired Chart */
	this.showChart = function( n ) {
		// Check for a valid month
		if ($("#mese").val() != '') {
			$("#right-panel .nav-tabs li").removeClass('active');
			if (n == 1){
				$("#chart-div2").hide();
				$("#chart-div").show();
				$($("#right-panel .nav-tabs li")[0]).addClass('active');
				this.plot1.replot();
			} else {
				$("#chart-div").hide();
				$("#chart-div2").show();
				this.plot2.replot();
				$($("#right-panel .nav-tabs li")[1]).addClass('active');
			}		
		}
	}
	
	this.updateSaldo = function() {
		$("#saldo").val(parseFloat($("#entrate").val()) - parseFloat($("#uscite").val()));	
	}
	
	this.setYear = function(yy) {
		this.yy = parseInt(yy);
	}

	$(document).ready(function(){				

		// Inizializzo il validate
		$("#modifica-spesa-form").validate({
			rules: {
				"data" : "required",
				"categoria" : "required",
				"sottocategoria" : "required",
				"descrizione" : "required",
				"importo": {
					"required": true,
					"number": true
				}
			}, 
			messages: {
				"data" : "",
				"categoria" : "",
				"sottocategoria" : "",
				"descrizione" : "",
				"importo": ""
			}
		});
		
		// Inizializzo il datepicker
		$('#data').datepicker({
			"format": "dd-mm-yyyy",
			"autoclose":true,
			"todayBtn":true,
			"language":"it",
		});


		$("#loading-page").hide();
	});
	
}
