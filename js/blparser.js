//BLParser

function BLParser(){
	this.setInfo = null;
	this.setInventory = null;
	this.commonShops = {};
	this.corsproxy = "https://crossorigin.me/";
	var self = this;
	this.getBLsetInfo = function(legoid, callback){
		$.ajax({
			url:self.corsproxy + "https://alpha.bricklink.com/pages/clone/catalogitem.page?S=" + legoid,
			method:"GET"
		}).done(function(data){
			var re = /idItem\:\t*([0-9]*)/g;
			var id = re.exec(data)[1];

			if(id){
				self.setInfo = id;
				callback(true, id);
			}
			else{
				callback(false);
			}
		});
	}

	this.getInventoryFromSet = function(blid, callback){
		$.ajax({
			url:self.corsproxy + "https://alpha.bricklink.com/pages/clone/catalogitem_invtab.page?idItem=" + blid,
			method:"GET"
		}).done(function(data){
			//console.log(data);
			var d = $(data);
			var inventory = {};
			d.find('.pciinvItemRow').each(function(){
				//we get each important info:
				var name = $(this).find('td:nth-child(5) > b').text();
				var qty = $(this).find('td:nth-child(3)').text();
				var legoid = $(this).find('td:nth-child(4) > a').text();
				var re = /idColor=([0-9]*)/gi;
				var color = null;
				var r = re.exec($(this).find('td:nth-child(4) > a').attr('href'));
				if(r){
					color = r[1];
					
				}
				var imglink = $(this).find('td:nth-child(2) span:nth-child(1) img').attr('src');
				var blid = $(this).find('td:nth-child(2) span:nth-child(1)').attr('data-itemid');
				var item = {
					name:name,
					qty:qty,
					legoid:legoid,
					blid:blid,
					color:color,
					imglink:imglink
				};

				inventory[blid + "-" + color] = item;
			});

			if(inventory !== {}){
				self.setInventory = inventory;
				callback(true, inventory);
			}
			else{
				callback(false);
			}
		});
	}

	this.getItemPriceForQty = function(item, callback){
		var url = "https://alpha.bricklink.com/ajax/clone/catalogifs.ajax?itemid=" + item.blid + "&color=" + item.color + "&minqty=" + item.qty;
		console.log(url);
		$.ajax({
			url:self.corsproxy + url,
			method:"GET",
			dataType:"JSON"
		}).done(function(data){
			self.setInventory[item.blid + "-" + item.color].shops = data.list;
			callback(true, data.list[0]);
		});
	}

	this.getCommonShops = function(){
		for(var item in self.setInventory){
			console.log("item : " + item);
			for(var shop in self.setInventory[item].shops){
				//we add all the shops in the array, with the items available
				console.log("shop : " + shop + " username : " + self.setInventory[item].shops[shop].strSellerUsername + " " + self.commonShops[self.setInventory[item].shops[shop].strSellerUsername]);
				if(!self.commonShops[self.setInventory[item].shops[shop].strSellerUsername]){
					console.log("caca");
					self.commonShops[self.setInventory[item].shops[shop].strSellerUsername] = [item];
				}
				else{
					console.log("prout");
					self.commonShops[self.setInventory[item].shops[shop].strSellerUsername].push(item);
				}
			}
		}
		console.log("array : " + JSON.stringify(self.commonShops));
	}
}

