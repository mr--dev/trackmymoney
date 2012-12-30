function ViewStat() {

	this.yy = 0;
	this.mm = 0;

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
						'	<td class="categoria">'+record['categoria']+'</td>'+
						'	<td class="sottocategoria">'+record['sottocategoria']+'</td>'+
						'	<td class="descrizione">'+record['descrizione']+'</td>'+
						'	<td class="importo">'+record['importo']+'</td>'+
						'	<td class="modifica"><i class="icon-edit"></i></td>'+
						'	<td class="elimina"><i class="icon-remove"></i></td>'+
						'</tr>'
					);
					tot_uscite += record['importo'];
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
		plot1 = $.jqplot ('chart-div', [datachart], {
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
		plot1.redraw();
		
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
		plot2 = $.jqplot('chart-div2', plot2data, {
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
		plot2.redraw();
	}
	
	this.updateSaldo = function() {
		$("#saldo").val(parseFloat($("#entrate").val()) - parseFloat($("#uscite").val()));	
	}
	
	this.setYear = function(yy) {
		this.yy = parseInt(yy);
	}

	$(document).ready(function(){		
		$("#loading-page").hide();
	});
	
}
