var express = require('express');
var router = express.Router();
var Web3 = require('web3');

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://104.210.155.28:30303"));
}

/* GET users listing. */
router.get('/', function(req, res, next) {
	var address = req.param('address');
	var balance = web3.eth.getBalance(address);
	res.send('get balance of acount: '+ address + 'balance: '+ balance.toNumber());
});

module.exports = router;