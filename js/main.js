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

		getBLsetInfo(setid, function(ok, blid){
			console.log(ok + blid);
			if(ok){
				getInventoryFromSet(blid, function(ok, inventory){
					if(ok){
						for(var i =0; i<inventory.length;i++){
							//for each item we show it, and we get pricing
							showSetItem(inventory[i]);
							getItemPriceForQty(inventory[i], function(ok, value){
								if(ok){
									//update info with price
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