
var Parser = new BLParser();

$(document).ready(function(){
	function showSetItem(item){
		var dom = '<div class="setitem">' +
					'<h3>' + item.name + '</h3>' +
					'<p>Quantity : ' + item.qty + '</p>' +
					'</div>';
			$('#result').append(dom);
	}

	$('#launchsearch').click(function(){
		var setid = $('#setid').val();

		Parser.getBLsetInfo(setid, function(ok, blid){
			console.log(ok + blid);
			if(ok){
				Parser.getInventoryFromSet(blid, function(ok, inventory){
					if(ok){
						for(var item in inventory){
							//for each item we show it, and we get pricing
							showSetItem(inventory[item]);
							Parser.getItemPriceForQty(inventory[item], function(ok, value){
								if(ok){
									//update info with price from the cheapest store
									
								}
								else{
									
								}
							});
						}
					}
				});
			}
			else{
				//show error
			}
			
		});
	});
});