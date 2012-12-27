function Home() {

	this.showSubCat = function(id2show) {
		$('#home-subdescrizione').val('');
		$('.home-subcat').hide();
		$('#'+id2show).show();
		$('.home-subdescrizione').show();
		$('.home-inserisci').show();
	}
	
}
