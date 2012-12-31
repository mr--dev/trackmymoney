function Home() {

	this.cat = '';
	this.subcat = '';
	
	/* Sending data to server */
	this.addSpesa = function() {
		$("#loading-page").show();
		this.subcat = $("input[name='"+this.cat+"-optionsRadios']:checked").val().split('-')[1];
		data = {
			'cat': this.cat,
			'subcat': this.subcat,
			'data': $("#data-spesa").val(),
			'descrizione': $("#home-subdescrizione").val(),
			'importo': $("#home-importo").val()
		}
		$.post('/home', {'azione': 'addSpesa', 'data': JSON.stringify(data)}, function(retdata){
			$("#loading-page").hide();
			retCode = JSON.parse(retdata);
			bootbox.alert(retCode['messaggio'], function(result){
				if (retCode['stato'] == 0)
					location.reload();
			});
		})
	}
	

	/* Show options for selected category */
	this.showSubCat = function(id2show, el) {
		
		// Highlight selected button
		$(".selected-tile").removeClass('selected-tile');
		$(el).addClass('selected-tile');
		
		// Setting category
		this.cat = id2show.split('-')[0];
		
		$('#home-subdescrizione').val('');
		$('.home-subcat').hide();
		$('#'+id2show).show();
		$('.home-subdescrizione').show();
		$('.home-importo').show();
		$('.home-inserisci').show();
		
	}
	
	$(document).ready(function(){
		
		// Inizializzo il validate
		$("#home-form").validate({
			rules: {
				"data-spesa" : "required",
				"home-subdescrizione" : "required",
				"home-importo": {
					"required": true,
					"number": true
				}
			}, 
			messages: {
				"data-spesa" : "",
				"home-subdescrizione" : "",
				"home-importo" : ""
			}
		});
		
		// Inizializzo il datepicker
		$('#data-spesa').datepicker({
			"format": "dd-mm-yyyy",
			"autoclose":true,
			"todayBtn":true,
			"language":"it",
		});
		
		$("#loading-page").hide();
	});
	
}
