var express = require('express');
var router = express.Router();
var Web3 = require('web3');

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8000"));
}

/* GET users listing. */
router.get('/', function(req, res, next) {
	var address = req.param('address');
	console.log("address: " + address);
	var balance = web3.fromWei(web3.eth.getBalance(address),'ether');
	res.json({
		'state':true,
		'address': address,
		'amount': balance,
	});
});

module.exports = router;