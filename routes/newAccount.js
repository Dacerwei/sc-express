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
	var user_key = req.param('user_key');
	var address = web3.personal.newAccount(user_key);
	var index = web3.eth.accounts.length -1;
	var initial_amount = 500;

	web3.personal.unlockAccount(web3.eth.accounts[0],"robot");
	web3.personal.unlockAccount(address,user_key,43200);
	web3.eth.sendTransaction({
		from: web3.eth.accounts[0],
		to: address,
		value: web3.toWei(initial_amount,'ether')
	});

	res.json({
		'user_key': user_key,
		'address': address,
		'account_index': index,
		'initial_amount': initial_amount
	});
});

module.exports = router;