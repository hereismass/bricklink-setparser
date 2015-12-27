$(document).ready(function(){
	$('#launchsearch').click(function(){
		var setid = $('#setid').val();

		//we get bricklink page
		$.ajax({
			url:"http://cors.io/?u=https://alpha.bricklink.com/pages/clone/catalogitem.page?S=" + setid,
			method:"GET",
		}).done(function(data){
			var re = /idItem\:\t*([0-9]*)/g;
			var id = re.exec(data)[1];
			//we got internal bricklink item id
			$.ajax({
				url:"http://cors.io/?u=https://alpha.bricklink.com/pages/clone/catalogitem_invtab.page?idItem=" + setid,
				method:"GET",
			}).done(function(data){
				console.log(data);
				var d = $(data);
				d.filter('.pciinvItemRow').each(function(){
					//console.log($(this));
				});
			});
		});
	});
});