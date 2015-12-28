//BLParser
var getBLsetInfo = function(legoid, callback){
	$.ajax({
		url:"http://cors.io/?u=https://alpha.bricklink.com/pages/clone/catalogitem.page?S=" + legoid,
		method:"GET"
	}).done(function(data){
		var re = /idItem\:\t*([0-9]*)/g;
		var id = re.exec(data)[1];

		if(id){
			callback(true, id);
		}
		else{
			callback(false);
		}
	});
}

var getInventoryFromSet = function(blid, callback){
	$.ajax({
		url:"http://cors.io/?u=https://alpha.bricklink.com/pages/clone/catalogitem_invtab.page?idItem=" + blid,
		method:"GET"
	}).done(function(data){
		//console.log(data);
		var d = $(data);
		var inventoryArray = [];
		d.find('.pciinvItemRow').each(function(){
			//we get each important info:
			var name = $(this).find('td:nth-child(5) > b').text();
			var qty = $(this).find('td:nth-child(3)').text();
			var legoid = $(this).find('td:nth-child(4) > a').text();
			var re = /idColor=([0-9]*)/gi;
			var color = null;
			var r = re.exec($(this).find('td:nth-child(4) > a').attr('href'));
			console.log(r);
			if(r){
				color = r[1];
				
			}
			var imglink = $(this).find('td:nth-child(2) span:nth-child(1) img').attr('src');
			var blid = $(this).find('td:nth-child(2) span:nth-child(1)').attr('data-itemid');
			console.log("item from set : " + name + " " + qty + " " + legoid + " " + color);
			var item = {
				name:name,
				qty:qty,
				legoid:legoid,
				blid:blid,
				color:color,
				imglink:imglink
			};

			inventoryArray.push(item);
		});

		if(inventoryArray.length > 0){
			callback(true, inventoryArray);
		}
		else{
			callback(false);
		}
	});
}

var getItemPriceForQty = function(item, callback){
	$.ajax({
		url:"http://cors.io/?u=https://alpha.bricklink.com/ajax/clone/catalogifs.ajax?itemid=" + item.blid + "&color=" + item.color + "&minqty=" + item.qty,
		method:"GET",
		dataType:"JSON"
	}).done(function(data){
		console.log(JSON.stringify(data.list[0]), null, 4);
	});
}
