var express = require('express');
var app = express();
var PAY_POOL = {};

app.use(express.static(__dirname + '/public'));

app.get('/setPay', function(req, res){
	var key = req.query.key
	PAY_POOL[key] = {
		isPayed: true,
		data: {
			success: false
		}
	}
   res.send({success:true});
});

app.get('/fetchPayResult', function(req, res){
	var key = req.query.key
	initPayPool(key);
	var inter = setInterval(function(){
		if(PAY_POOL[key].isPayed){
			res.send(PAY_POOL[key]);
			clearInterval(inter)
		}
		console.log(PAY_POOL[key].isPayed)
	},500)
  
});

function initPayPool(key){
	PAY_POOL[key] = {
		isPayed: false,
		data: {

		}
	}
}

app.listen(3000);

console.info('server start on port 3000, http://loaclhost:3000');