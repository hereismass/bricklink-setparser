$(document).ready(function(){

	function showSetItem(name, qty, id, color){
		var dom = '<div class="setitem">' +
					'<h3>' + name + '</h3>' +
					'<p>Quantity : ' + qty + '</p>' +
					'</div>';
			$('#result').append(dom);
	}

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
				//console.log(data);
				var d = $(data);
				console.log(d);
				d.find('.pciinvItemRow').each(function(){
					//we get each important info:
					var name = $(this).find('td:nth-child(5) > b').text();
					var qty = $(this).find('td:nth-child(3)').text();
					var id = $(this).find('td:nth-child(4) > a').text();
					var re = /idColor=([0-9]*)/gi;
					var color = re.exec($(this).find('td:nth-child(4) > a').attr('href'))[1];
					console.log(name + " " + qty + " " + id + " " + color);
					showSetItem(name, qty, id, color);
				});
			});
		});
	});
});