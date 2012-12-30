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
				$("#loading-page").hide();
			});
		}
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
